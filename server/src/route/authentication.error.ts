import { Response } from "express";

export class AuthenticationError {

    constructor(res: Response, message: string) {
        res.status(500);
        res.json({code: message});
    }
}