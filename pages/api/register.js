import { connectMongoDB } from '@/helpers/db';

const handler = async (req, res) => {
	try {
		if (req.method === 'POST') {
			const userData = req.body;
			const { name, email, password } = userData;
			const expenses = []

			const client = await connectMongoDB();
			if (
				!name ||
				name.includes(' ') ||
				!email ||
				!email.includes('@') ||
				!password ||
				password.length < 8
			) {
				client.close();
				return;
			}

			const db = client.db();

			const existingUser = await db.collection('user').findOne({ email });

			if (existingUser) {
				res.status(401).json({ message: 'User already exists!' });
				client.close();
				return;
			}
			await db.collection('user').insertOne({ name, email, password, expenses });

			client.close();

			res.status(201).json({ message: 'Signed up!' });
		}
	} catch (error) {
		throw new Error(error);
	}
};

export default handler;
