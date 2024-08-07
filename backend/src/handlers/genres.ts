import { genresCollection } from '../db.js';
import { Request, Response } from 'express';

export const getGenres = async (req: Request, res: Response) => {
    try {
        const cursor = genresCollection.find();
        const genres = [];
        for await (const genre of cursor) {
            genres.push({
                ...genre,
                _id: genre._id.toString()
            });
        }
        await cursor.close();
        return res.json(genres);
    } catch (err) {
        console.error('Error fetching genres', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};