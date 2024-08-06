import { ObjectId } from "mongodb";

export default interface ReviewI {
    _id?: ObjectId,
    movieId: ObjectId,
    userId: ObjectId,
    userUsername: string;
    rating: number;
    content: string;
    creationDate: Date;
}