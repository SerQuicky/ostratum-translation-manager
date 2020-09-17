import { Response } from 'express';
import { token } from 'morgan';
import { User } from '../model/user.interface';
const bcrypt = require('bcrypt');

export class CommonController {

    constructor(){}

    public findSuccess(res: Response): (result: any) => void {
        return (result: any) => {
            res.status(200);
            res.json(result);
        }
    }

    public serverError(res: Response): (error: any) => void {
        return (error: any) => {
            res.status(500);
            res.json(error);
        }
    }
    
    public writeResult(res: Response): (result: any) => void {
        return (result: any) => {
            res.json({actionSuccess: result});
        }
    }

    public authenticate(res: Response): (result: any) => void {
        return (data: any) => {
            bcrypt.compare(data.password, data.result.password, function(err: any, result: boolean) {
                if(err) {
                    res.status(500);
                    res.json({actionSuccess: false});
                }
                console.log(result);

                res.status(200);
                res.json({actionSuccess: result, token: data.token});
            });
        }
    }

    public authenticatePassword(password: string, hash: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err: any, result: boolean) {
                if(err) {
                    reject(err)
                }
                result ? resolve() : reject("Wrong password");
            });
        });
    }
}