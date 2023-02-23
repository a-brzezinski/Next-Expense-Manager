import { connectMongoDB } from '@/helpers/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if (req.method === 'PATCH') {
		const client = await connectMongoDB();
		const data = req.body;

		const session = await getSession({ req });
		const sessionEmail = session.user.email;

		const db = client.db();

		const sessionUser = await db
			.collection('user')
			.find({ email: sessionEmail })
			.toArray();

		const userExpensesFromDB = sessionUser[0].expenses;
		const newArray = [data, ...userExpensesFromDB];

		const user = await db
			.collection('user')
			.updateOne({ email: sessionEmail }, { $set: { expenses: newArray } });

		client.close();

		res.status(201).json({ message: 'Successfull patch' });
	}
};

export default handler;
