import { usersCollection } from "../db.js";
import { Request, Response } from 'express';
import RegisterCredentialsI from "../interfaces/registerCredentials.js";
import LoginCredentialsI from "../interfaces/loginCredentials.js";
import { hashPassword, comparePasswords, generateJWT } from "../modules/auth.js";
import UserI from "../interfaces/user.js";

export const signIn = async (req: Request, res: Response) => {
    try {
        const credentials: LoginCredentialsI = {
            username: req.body.username,
            password: req.body.password
        };

        if (!credentials.username || !credentials.password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await usersCollection.findOne({ username: credentials.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isValid = await comparePasswords(credentials.password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const jwt = generateJWT(user as unknown as UserI);

        return res.json(jwt);
    } catch (err) {
        console.error('Error signing in', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        const credentials: RegisterCredentialsI = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        };

        if (!credentials.email || !credentials.password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const countUsers = await usersCollection.countDocuments({ email: credentials.email, username: credentials.username });
        if (countUsers > 0) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const hashedPassword = await hashPassword(credentials.password);
        const result = await usersCollection.insertOne({ email: credentials.email, username: credentials.username, password: hashedPassword });
        return res.json(result.insertedId);
    } catch (err) {
        console.error('Error signing up', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};