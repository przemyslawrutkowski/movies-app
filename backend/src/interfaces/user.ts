import { ObjectId } from "mongodb";

export default interface UserI {
    _id?: ObjectId;
    email: string;
    username: string;
    password: string;
}