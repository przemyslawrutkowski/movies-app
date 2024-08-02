import 'dotenv/config';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
    console.error("Missing required environment variables");
    process.exit(1);
}

const client = new MongoClient(uri);

const database = client.db(process.env.DB_NAME);
const moviesCollection = database.collection("movies");
const genresCollection = database.collection("genres");

const connectToDB = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
}

export { moviesCollection, genresCollection, connectToDB };