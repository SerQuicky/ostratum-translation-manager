import { Response } from 'express';
import { token } from 'morgan';
import { ServerResponse } from '../model/response.interface';
const bcrypt = require('bcrypt');

export class CommonController {

    constructor() { }

    public findSuccess(res: Response): (result: Promise<ServerResponse<any>>) => void {
        return (result: any) => {
            res.status(200);
            res.json({ code: 201, title: "GENERAL.FIND_SUCCESS_TITLE", message: "GENERAL.FIND_SUCCESS", value: result });
        }
    }

    public serverError(res: Response): (error: ServerResponse<any>) => void {
        return (error: ServerResponse<any>) => {
            res.status(200);
            res.json(error);
        }
    }

    public writeResult(res: Response): (result: ServerResponse<any>) => void {
        return (result: ServerResponse<any>) => {
            res.status(200);
            res.json(result);
        }
    }

    public authenticate(res: Response): (result: ServerResponse<[String, String]>) => void {
        return (data: any) => {
            if (data.state) {
                bcrypt.compare(data.password, data.result.password, function (err: any, result: boolean) {
                    if (err || !result) {
                        res.status(200);
                        res.json({ code: 500, title: "GENERAL.CODE_WRONG_PASSWORD_TITLE", message: "GENERAL.CODE_WRONG_PASSWORD", result: [] });
                    } else {
                        res.status(200);
                        res.json({ code: 200, title: "GENERAL.SUCCESS_SIGN_IN", message: "GENERAL.SUCCESS_SIGN_IN", value: [data.token, data.admin] });
                    }
                });
            } else {
                res.status(200);
                res.json({ code: 500, title: "GENERAL.UNKNOWN_ACCOUNT_TITLE", message: "GENERAL.UNKNOWN_ACCOUNT", result: [] });
            }
        }
    }

    public authenticatePassword(password: string, hash: string): Promise<ServerResponse<any>> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (err: any, result: boolean) {
                if (err) {
                    reject(err)
                }
                result ?
                    resolve({ code: 200, title: "GENERAL.CODE_PASSWORD_CHANGED_TITLE", message: "GENERAL.CODE_PASSWORD_CHANGED", result: [] })
                    : reject({ code: 500, title: "GENERAL.CODE_WRONG_OLD_PASSWORD_TITLE", message: "GENERAL.CODE_WRONG_OLD_PASSWORD", result: [] });
            });
        });
    }

    public getDateTime(date: number): number {
        const now = new Date(date);
        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);
        return parseInt(dateLocal.toISOString().slice(0, 19).replace(/-/g, "").replace("T", "").replace(/:/g, ""));
    }
}