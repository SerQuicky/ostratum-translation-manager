import { Request, Response } from "express";
import { Session } from "../main/session";

export class CommonRoutes {

    constructor(){}

/*     public async authenticateRequest(session: Session, req: Request, res: Response, func: (req: Request, res: Response) => Promise<void> | void) {
        const token: string = req.body.token;
        const bool = await session.verify(token);

        if(bool) {
            console.log(func);
            func(req, res);
        } else {
            res.status(500);
            res.json({message: "Expired access token!"});
        }
    } */
}