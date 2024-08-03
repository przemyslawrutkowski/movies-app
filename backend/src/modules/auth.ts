import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserI from '../interfaces/user.js';

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    console.error('Missing required environment variables');
    process.exit(1);
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
};

export const generateJWT = (user: UserI) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username
    }, secretKey);
};