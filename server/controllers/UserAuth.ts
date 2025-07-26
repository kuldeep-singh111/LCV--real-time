import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserStore } from '../models/User';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.JWT_TOKEN as string;


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "all fileds are required" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserStore({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("error hai bahai ", error)
        res.status(500).json({ message: 'Error registering user', error });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }


    try {
        const user = await UserStore.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

