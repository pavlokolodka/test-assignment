import { MongoClient } from 'mongodb';

export const getDb = async () => {
  const client: any = await MongoClient.connect(process.env.MONGO_URL);
  return client.db();
};