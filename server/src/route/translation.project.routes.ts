import { Request, Response, Application } from 'express';
import { TranslationProjectController } from '../controller/translation.project.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';
import { CommonRoutes } from './common.routes';

export class TranslationProjectRoutes {

    private app: Application;
    private translationProjectController: TranslationProjectController;
    private session: Session;
    private commonRoutes: CommonRoutes;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.commonRoutes = new CommonRoutes();
        this.translationProjectController = new TranslationProjectController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/translationProjects', (req: Request, res: Response) => {
            this.translationProjectController.getTranslationProjects(req, res)
        });

        this.app.post('/addTranslationProject', (req: Request, res: Response) => {
            this.translationProjectController.addTranslationProject(req, res);
        });

        this.app.post('/updateTranslationProject', (req: Request, res: Response) => {
            this.translationProjectController.updateTranslationProject(req, res);
        });

        this.app.post('/deleteTranslateProject', (req: Request, res: Response) => {
            this.translationProjectController.deleteTranslateProject(req, res);
        });
    }
}