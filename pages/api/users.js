import { connectMongoDB } from '@/helpers/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const session = await getSession({req})
		const sessionEmail = session.user.email
		const client = await connectMongoDB();

		const db = client.db();

		const users = await db
			.collection('user')
			.find({ email: sessionEmail })
			.toArray();

		client.close();
		res.status(200).json({ users: users });
	}
};

export default handler;
