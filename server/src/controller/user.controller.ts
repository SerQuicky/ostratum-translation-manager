import { Request, Response } from 'express';
import { UserDao } from '../dao/user.dao';
import { Session } from '../main/session';
import { User } from '../model/user.interface'; import { CommonController } from './common.controller';
const bcrypt = require('bcrypt');

export class UserController {

    private commonController: CommonController;
    private userDao: UserDao;
    private saltRounds = 10;

    constructor() {
        this.commonController = new CommonController();
        this.userDao = new UserDao();
    }

    public async register(req: Request, res: Response) {
        const user: User = await this.buildUser(req);

        this.userDao.register(user)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res));
    }

    public async authenticate(session: Session, req: Request, res: Response): Promise<void> {

        this.userDao.authenticate(session, true, req.body.username, req.body.password)
            .then(this.commonController.authenticate(res))
            .catch(this.commonController.serverError(res));
    }

    public async changePassword(session: Session, req: Request, res: Response) {
        const hashedNew: string = await bcrypt.hash(req.body.newPassword, this.saltRounds);

        this.userDao.authenticate(session, false, req.body.username, req.body.oldPassword)
            .then(data => {
                this.commonController.authenticatePassword(req.body.oldPassword, data.result.password).then(_ => {
                    this.userDao.changePassword(req.body.username, hashedNew)
                        .then(this.commonController.writeResult(res))
                        .catch(this.commonController.serverError(res))
                })
                    .catch(this.commonController.serverError(res));
            })
            .catch(this.commonController.serverError(res));
    }

    public users(req: Request, res: Response): void {
        this.userDao.getUsers()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteUser(req: Request, res: Response): void {
        this.userDao.deleteUser(req.body.id)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res))
    }

    public async updateUser(req: Request, res: Response) {
        const hashedNew: string = await bcrypt.hash(req.body.password, this.saltRounds);

        this.userDao.updateUser(req.body.id, req.body.username, hashedNew)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res))
    }

    private buildUser(req: Request): Promise<User> {
        return new Promise(async (resolve, reject) => {
            let user: User =
            {
                id: 0,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, this.saltRounds),
            };

            resolve(user);
        })
    }
}