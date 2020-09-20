import { Request, Response, Application } from 'express';
import { TranslationController } from '../controller/translation.controller';
import { Session } from '../main/session';
import { AuthenticationError } from './authentication.error';
import { CommonRoutes } from './common.routes';

export class TranslationRoutes {

    private app: Application;
    private translationController: TranslationController;
    private session: Session;
    private commonRoutes: CommonRoutes;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.commonRoutes = new CommonRoutes();
        this.translationController = new TranslationController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.post('/getTranslations', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.body.token)
            .then(_ => this.translationController.getTranslations(req, res)) 
            .catch(err => new AuthenticationError(res, err))
        });

        this.app.post('/addTranslation', (req: Request, res: Response) => {
            this.translationController.addTranslation(req, res);
        });

        this.app.post('/updateTranslation', (req: Request, res: Response) => {
            this.translationController.updateTranslation(req, res);
        });

        this.app.post('/deleteTranslateProject', (req: Request, res: Response) => {
            this.translationController.deleteTranslation(req, res);
        });
    }
}