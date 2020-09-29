import { Response } from "express";
import { ServerResponse } from '../model/response.interface';

export class AuthenticationError {

    constructor(res: Response, response: ServerResponse<any>) {
        res.status(200);
        res.json(response);
    }
}