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

        this.app.post('/testest', (req: Request, res: Response) => {
            this.commonRoutes.authenticateRequest(this.session, req, res, this.temp);
        });
    }

    private temp(req: Request, res: Response): Promise<void> {
        return new Promise((resolve, reject) => resolve("void"))
        .then(u => { res.status(200); res.json({ message: "YESA" }) }).catch(err => { res.status(500); res.json({ message: "UFF" }) });
    }
}