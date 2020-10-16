import { Request, Response, Application } from 'express';
import { TranslationController } from '../controller/translation.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';

export class TranslationRoutes {

    private app: Application;
    private translationController: TranslationController;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.translationController = new TranslationController();
        this.initRoutes();
    }

    private initRoutes(): void {
        
        this.app.post('/translations', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationController.getTranslations(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/addTranslation', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationController.addTranslation(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/updateTranslation', (req: Request, res: Response) => {
            this.session.verify(req.headers['authorization']).then(_ => this.translationController.updateTranslation(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/deleteTranslation', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.translationController.deleteTranslation(req, res)).catch(_ => new InvalidTokenError(res))
        });
    }
}