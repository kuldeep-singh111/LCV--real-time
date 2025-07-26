import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Document } from "mongoose";
import { UserStore } from '../models/User';

export interface AuthenticatedRequest extends Request {
    user?: Document<any> | null;
}

const JWT_SECRET = process.env.JWT_TOKEN as string;


const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided. Login again' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await UserStore.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;