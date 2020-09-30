import { Request, Response, Application } from 'express';
import { ProjectController } from '../controller/project.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';
import { CommonRoutes } from './common.routes';

export class ProjectRoutes {

    private app: Application;
    private projectController: ProjectController;
    private session: Session;
    private commonRoutes: CommonRoutes;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.commonRoutes = new CommonRoutes();
        this.projectController = new ProjectController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/projects', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.projectController.getProjects(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.get('/userProjects', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.projectController.getProjectOfUser(req, res, this.session)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/addProject', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.projectController.addProject(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/addRoleToProject', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.projectController.addRoleToProject(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/updateProject', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.projectController.updateProject(req, res, this.session)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/deleteProject', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.projectController.deleteProject(req, res)).catch(_ => new InvalidTokenError(res))
        });
    }
}