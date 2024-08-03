import 'dotenv/config';
import process from 'node:process';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
    console.error("Missing required environment variables");
    process.exit(1);
}

const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
})();

const disconnectFromDB = async (signal: string) => {
    console.log(`${signal} signal received: closing MongoDB connection`);
    try {
        await client.close();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error('Error closing MongoDB connection', err);
    } finally {
        process.exit(0);
    }
};

process.on('beforeExit', async () => {
    console.log('beforeExit event called');
    await client.close();
});

process.on('SIGINT', () => disconnectFromDB('SIGINT'));  // CTRL+C
process.on('SIGQUIT', () => disconnectFromDB('SIGQUIT')); // Keyboard quit
process.on('SIGTERM', () => disconnectFromDB('SIGTERM')); // `kill` command

const database = client.db(process.env.DB_NAME);
const moviesCollection = database.collection("movies");
const genresCollection = database.collection("genres");
const usersCollection = database.collection("users");

export { moviesCollection, genresCollection, usersCollection };