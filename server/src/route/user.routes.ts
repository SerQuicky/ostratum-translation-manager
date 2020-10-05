import { Request, Response, Application } from 'express';
import { UserController } from '../controller/user.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';

export class UserRoutes {

    private app: Application;
    private userController: UserController;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.userController = new UserController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.post('/register', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.userController.register(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/authenticate', (req: Request, res: Response) => {
            this.userController.authenticate(this.session, req, res);
        });

        this.app.get('/users', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.userController.users(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/changePassword', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.userController.changePassword(this.session, req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/deleteUser', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.userController.deleteUser(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/updateUser', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.userController.updateUser(req, res)).catch(_ => new InvalidTokenError(res))
        });


        this.app.post('/logout', async (req: Request, res: Response) => {
            await this.session.remove(req.headers['authorization']);
            res.json({ code: 200, message: "SIGN_OUT_SUCCESS", value: [] });
            res.status(200);
        });
    }
}