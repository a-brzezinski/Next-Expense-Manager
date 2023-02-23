import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/helpers/db';
import { verifyPassword } from '@/helpers/hashpassword';

export default NextAuth({
	session: {
		jwt: true,
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				const client = await connectMongoDB();

				const allUsers = client.db().collection('user');

				const user = await allUsers.findOne({ email: credentials.email });

				if (!user) {
					client.close();
					throw new Error('No user found');
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					throw new Error('Could not log you in');
				}

				client.close();
				return {
					email: user.email,
				};
			},
		}),
	],
});
