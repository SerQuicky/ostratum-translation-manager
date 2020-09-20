import { Request, Response, Application } from 'express';
import { UserController } from '../controller/user.controller';
import { Session } from '../main/session';
import { CommonRoutes } from './common.routes';

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

        this.app.post('/changePassword', (req: Request, res: Response) => {
            this.userController.changePassword(this.session, req, res);
        });
    }
}