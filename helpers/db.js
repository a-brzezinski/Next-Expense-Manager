import { MongoClient } from 'mongodb';

export const connectMongoDB = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://admin:admin@cluster0.zx5npmc.mongodb.net/users?retryWrites=true&w=majority'
	);

	return client;
};
