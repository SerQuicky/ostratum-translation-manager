import { Request, Response, Application } from 'express';
import { TranslationProjectController } from '../controller/translation.project.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';

export class TranslationProjectRoutes {

    private app: Application;
    private translationProjectController: TranslationProjectController;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.translationProjectController = new TranslationProjectController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.post('/translationProjects', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationProjectController.getTranslationProjects(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/addTranslationProject', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationProjectController.addTranslationProject(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/updateTranslationProject', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationProjectController.updateTranslationProject(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/deleteTranslationProject', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.translationProjectController.deleteTranslationProject(req, res)).catch(_ => new InvalidTokenError(res))
        });
    }
}