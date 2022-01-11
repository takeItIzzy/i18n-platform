import { MongoClient } from 'mongodb';

const { MONGO_URI, MONGO_DB } = process.env;

// check the MongoDB URI
if (!MONGO_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGO_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {};

  // Connect to cluster
  let client = new MongoClient(MONGO_URI, opts);
  await client.connect();
  let db = client.db(MONGO_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
export default connectDB;
