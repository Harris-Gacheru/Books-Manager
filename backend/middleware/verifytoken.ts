import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
interface RequestExtended extends Request{
    users?: any
}

export const verifyToken = (req: RequestExtended, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string

        if (!token) {
            return res.json({error: 'Unauthorized!'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        req.users = decoded
    } catch (error) {
        return res.json({error: 'Invalid token'})
    }

    next()
}