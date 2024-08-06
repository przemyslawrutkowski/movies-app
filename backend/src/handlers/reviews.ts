import { reviewsCollection } from "../db.js";
import { usersCollection, moviesCollection } from "../db.js";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import NewReviewI from "../interfaces/newReview.js";

export const getReviews = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;

        if (!movieId) {
            return res.status(400).json({ message: 'Movie id is required.' });
        }

        const cursor = reviewsCollection.find({ movieId: new ObjectId(movieId) });
        const reviews = [];
        for await (const review of cursor) {
            reviews.push(review);
        }
        await cursor.close();

        const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {
            const user = await usersCollection.findOne({ _id: review.userId });
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
        console.log(req.body);
        const review: NewReviewI = {
            movieId: req.body.movieId,
            rating: req.body.rating,
            content: req.body.content,
            creationDate: new Date(req.body.creationDate)
        }

        if (!review.movieId || !review.rating || !review.content || !review.creationDate) {
            return res.status(400).json({ message: 'Movie id, rating, content and creation date are required.' });
        }

        const insertReviewResult = await reviewsCollection.insertOne({
            movieId: new ObjectId(review.movieId as string),
            userId: new ObjectId(req.body.payload._id as string),
            userUsername: req.body.payload.username,
            rating: review.rating,
            content: review.content,
            creationDate: review.creationDate
        });
        console.log(`Is insert review write result acknowledged: ${insertReviewResult.acknowledged}`);

        const updateMovieRatingComponentsResult = await moviesCollection.updateOne({ _id: new ObjectId(review.movieId as string) }, { $inc: { ratingsCount: 1, ratingsSum: review.rating } });
        console.log(`Is update movie ratings write result acknowledged: ${updateMovieRatingComponentsResult.acknowledged}`);

        const updatedMovie = await moviesCollection.findOne({ _id: new ObjectId(review.movieId as string) });
        if (updatedMovie) {
            const newRating = updatedMovie.ratingsSum / updatedMovie.ratingsCount;

            const updateMovieRatingResult = await moviesCollection.updateOne(
                { _id: new ObjectId(review.movieId as string) },
                { $set: { rating: newRating } }
            );
            console.log(`Is update movie rating write result acknowledged: ${updateMovieRatingResult.acknowledged}`);
        }

        res.json(insertReviewResult.insertedId);
    } catch (err) {
        console.error('Error creating review', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}