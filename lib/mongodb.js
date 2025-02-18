import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://FatmataNdiaye:Zahratii123@cluster0.6xoab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        }).catch((err) => {
            console.error('Failed to connect to MongoDB:', err.message);
            throw new Error(err);
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (err) {
        console.error('Error while connecting to MongoDB:', err.message);
        throw err;
    }
}

export default dbConnect;