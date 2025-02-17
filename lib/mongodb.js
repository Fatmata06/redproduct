import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let dbConnect;

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI n'est pas défini dans .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongodbConnect) {
    client = new MongoClient(uri, options);
    global._mongodbConnect = client.connect();
  }
  dbConnect = global._mongodbConnect;
} else {
  client = new MongoClient(uri, options);
  dbConnect = client.connect();
}

export default dbConnect;
