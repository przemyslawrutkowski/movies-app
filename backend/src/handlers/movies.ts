import { moviesCollection } from '../db.js';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

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
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export const getMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Movie id is required.' });
        }

        const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

        return res.json(movie);
    } catch (err) {
        console.error('Error fetching movie', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};