import { reviewsCollection } from "../db.js";
import { usersCollection } from "../db.js";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import NewReviewI from "../interfaces/newReview.js";

export const getReviews = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;

        if (!movieId) {
            return res.status(400).json({ message: 'Movie id is required.' });
        }

        const movieObjectId = new ObjectId(movieId);

        const cursor = reviewsCollection.find({ movieId: movieObjectId });
        const reviews = [];
        for await (const review of cursor) {
            reviews.push(review);
        }
        await cursor.close();

        const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {
            const userObjectId = new ObjectId(review.userId as string);
            const user = await usersCollection.findOne({ _id: userObjectId });
            return {
                ...review,
                username: user?.username
            };
        }));

        return res.json(reviewsWithUsernames);
    } catch (err) {
        console.error('Error fetching reviews', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export const createReview = async (req: Request, res: Response) => {
    try {
        const review: NewReviewI = {
            movieId: req.body.movieId,
            rating: req.body.rating,
            content: req.body.content,
            creationDate: req.body.creationDate
        }

        if (!review.movieId || !review.rating || !review.content || !review.creationDate) {
            return res.status(400).json({ message: 'Movie id, rating, content and creation date are required.' });
        }

        const result = await reviewsCollection.insertOne({
            movieId: new ObjectId(review.movieId as string),
            userId: new ObjectId(req.body.payload._id as string),
            userUsername: req.body.payload.username,
            rating: review.rating,
            content: review.content,
            creationDate: review.creationDate
        });
        res.json(result.insertedId);
    } catch (err) {
        console.error('Error creating review', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}