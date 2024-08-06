import { ObjectId } from "mongodb";

export default interface MovieI {
    _id?: ObjectId;
    title: string;
    year: string;
    released: string;
    runtime: string;
    genres: ObjectId[];
    directors: string[];
    writers: string[];
    actors: string[];
    plot: string;
    countries: string[];
    awards: string;
    poster: string;
    rating: number | null;
    ratingsCount: number,
    ratingsSum: number
}