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
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        const isValid = await comparePasswords(credentials.password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
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

        const countUsersByEmail = await usersCollection.countDocuments({ email: credentials.email });
        if (countUsersByEmail > 0) {
            return res.status(409).json({ message: 'User with specified email already exists.' });
        }

        const countUsersByUsername = await usersCollection.countDocuments({ username: credentials.username });
        if (countUsersByUsername > 0) {
            return res.status(409).json({ message: 'User with specified username already exists.' });
        }

        const hashedPassword = await hashPassword(credentials.password);
        const result = await usersCollection.insertOne({ email: credentials.email, username: credentials.username, password: hashedPassword });
        return res.json(result.insertedId.toString());
    } catch (err) {
        console.error('Error signing up', err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};