import { ObjectId } from "mongodb";

export default interface GenreI {
    _id?: ObjectId | string;
    name: string;
}