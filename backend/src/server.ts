import 'dotenv/config';
import process from 'process';
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!port || !uri || !dbName) {
    console.error('Missing required environment variables');
    process.exit(1);
}

const client = new MongoClient(uri);

async function fetchCollectionData(collectionName: string) {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const cursor = collection.find();
    const dataList = [];
    for await (const item of cursor) {
        dataList.push(item);
    }
    await cursor.close();
    return dataList;
}

async function run() {
    try {
        await client.connect();
        console.log('Connected to the database');

        const app = express();

        app.use(express.json());
        app.use(cors());

        app.get('/movies', async (req, res) => {
            try {
                const moviesList = await fetchCollectionData('movies');
                res.json(moviesList);
            } catch (err) {
                console.error('Error fetching movies', err);
                res.status(500).send('Internal Server Error');
            }
        });

        app.get('/genres', async (req, res) => {
            try {
                const genresList = await fetchCollectionData('genres');
                res.json(genresList);
            } catch (err) {
                console.error('Error fetching genres', err);
                res.status(500).send('Internal Server Error');
            }
        });

        app.listen(port, () => {
            console.log(`Movies app listening on port ${port}`);
        });

        const shutdown = async (signal: string) => {
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
            console.log('beforeExit event');
            await client.close();
        });

        process.on('SIGINT', () => shutdown('SIGINT'));  // CTRL+C
        process.on('SIGQUIT', () => shutdown('SIGQUIT')); // Keyboard quit
        process.on('SIGTERM', () => shutdown('SIGTERM')); // `kill` command
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
};

run().catch(console.dir);
