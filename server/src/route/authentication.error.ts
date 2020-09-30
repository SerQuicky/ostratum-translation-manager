import { Response } from "express";
import { ServerResponse } from '../model/response.interface';

export class InvalidTokenError {

    constructor(res: Response) {
        res.status(200);
        res.json({code: 400, message: "INVALID_TOKEN"});
    }
}