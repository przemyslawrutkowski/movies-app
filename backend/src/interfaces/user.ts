import { ObjectId } from "mongodb";

export default interface UserI {
    _id?: ObjectId | string;
    email: string;
    username: string;
    password: string;
}