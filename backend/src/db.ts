import 'dotenv/config';
import process from 'node:process';
import { MongoClient } from "mongodb";
import UserI from './interfaces/user.js';
import ReviewI from './interfaces/review.js';
import MovieI from './interfaces/movie.js';
import GenreI from './interfaces/genre.js';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log("Connected to the database.");
    } catch (err) {
        console.error('Failed to connect to the database.', err);
    }
})();

const disconnectFromDB = async (signal: string) => {
    console.log(`${signal} signal received: closing MongoDB connection.`);
    try {
        await client.close();
        console.log('MongoDB connection closed.');
    } catch (err) {
        console.error('Error closing MongoDB connection.', err);
    } finally {
        process.exit(0);
    }
};

process.on('beforeExit', async () => {
    console.log('beforeExit event called.');
    await client.close();
});

process.on('SIGINT', () => disconnectFromDB('SIGINT'));  // CTRL+C
process.on('SIGQUIT', () => disconnectFromDB('SIGQUIT')); // Keyboard quit
process.on('SIGTERM', () => disconnectFromDB('SIGTERM')); // `kill` command

const database = client.db(process.env.DB_NAME);
const moviesCollection = database.collection<MovieI>("movies");
const genresCollection = database.collection<GenreI>("genres");
const usersCollection = database.collection<UserI>("users");
const reviewsCollection = database.collection<ReviewI>("reviews");

export { moviesCollection, genresCollection, usersCollection, reviewsCollection };