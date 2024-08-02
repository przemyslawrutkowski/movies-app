import 'dotenv/config';
import { moviesCollection } from '../db.js';
import { Request, Response } from 'express';

export const getMovies = async (req: Request, res: Response) => {
    try {
        const cursor = moviesCollection.find();
        const movies = [];
        for await (const movie of cursor) {
            movies.push(movie);
        }
        await cursor.close();
        return res.json(movies);
    } catch (err) {
        console.error('Error fetching movies', err);
        res.status(500).send('Internal Server Error');
    }
}