import { Request, Response, Application } from 'express';
import { RoleController } from '../controller/role.controller';
import { Session } from '../main/session';

export class RoleRoutes {

    private app: Application;
    private roleController: RoleController;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.roleController = new RoleController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/roles', (req: Request, res: Response) => {
            this.roleController.getRoles(req, res);
        });

        this.app.post('/addRole', (req: Request, res: Response) => {
            this.roleController.addRole(req, res);
        });

        this.app.post('/addUserToRole', (req: Request, res: Response) => {
            this.roleController.addUserToRole(req, res);
        });

        this.app.post('/updateRole', (req: Request, res: Response) => {
            this.roleController.updateRole(req, res);
        });

        this.app.post('/deleteRole', (req: Request, res: Response) => {
            this.roleController.deleteRole(req, res);
        });
    }
}