import { Request, Response, Application } from 'express';
import { RoleController } from '../controller/role.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';

export class RoleRoutes {

    private app: Application;
    private roleController: RoleController;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.roleController = new RoleController();
        this.initRoutes();
        this.session = session;
    }

    private initRoutes(): void {
        this.app.get('/roles', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.roleController.getRoles(req, res)).catch(_ => new InvalidTokenError(res));
        });

        this.app.post('/addRole', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.roleController.addRole(req, res)).catch(_ => new InvalidTokenError(res));
        });

        this.app.post('/addUserToRole', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.roleController.addUserToRole(req, res)).catch(_ => new InvalidTokenError(res));
        });

        this.app.post('/updateRole', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.roleController.updateRole(req, res)).catch(_ => new InvalidTokenError(res));
        });

        this.app.post('/deleteRole', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.roleController.deleteRole(req, res)).catch(_ => new InvalidTokenError(res));
        });
    }
}