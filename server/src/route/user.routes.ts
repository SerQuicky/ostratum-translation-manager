import { Request, Response, Application } from 'express';
import { UserController } from '../controller/user.controller';
import { Session } from '../main/session';
import { CommonRoutes } from './common.routes';
import { ServerResponse } from '../model/response.interface';

export class UserRoutes {

    private app: Application;
    private userController: UserController;
    private commonRoutes: CommonRoutes;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.userController = new UserController();
        this.commonRoutes = new CommonRoutes();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.post('/register', (req: Request, res: Response) => {
            this.userController.register(req, res);
        });

        this.app.post('/authenticate', (req: Request, res: Response) => {
            this.userController.authenticate(this.session, req, res);
        });

        this.app.get('/users', (req: Request, res: Response) => {
            this.userController.users(req, res);
        });

        this.app.post('/changePassword', (req: Request, res: Response) => {
            this.userController.changePassword(this.session, req, res);
        });

        this.app.post('/deleteUser', (req: Request, res: Response) => {
            this.userController.deleteUser(req, res);
        });

        this.app.post('/updateUser', (req: Request, res: Response) => {
            this.userController.updateUser(req, res);
        });


        this.app.post('/logout', async (req: Request, res: Response) => {
            await this.session.remove(req.headers['authorization']);
            res.json({code: 200, message: "SIGN_OUT_SUCCESS", value: []});
            res.status(200);
        });
    }
}