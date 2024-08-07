import { ObjectId } from "mongodb";

export default interface ReviewI {
    _id?: ObjectId | string,
    movieId: ObjectId | string,
    userId: ObjectId | string,
    userUsername: string;
    rating: number;
    content: string;
    creationDate: Date | string;
}