import { Request, Response, Application } from 'express';
import { LanguageController } from '../controller/language.controller';
import { ProjectController } from '../controller/project.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';

export class LanguageRoutes {

    private app: Application;
    private languageController: LanguageController;
    private session: Session;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.languageController = new LanguageController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/languages', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.languageController.getLanguages(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/addLanguage', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.languageController.addLanguage(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/updateLanguage', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.languageController.updateLanguage(req, res)).catch(_ => new InvalidTokenError(res))
        });

        this.app.post('/deleteLanguage', (req: Request, res: Response) => {
            this.session.verifyAdmin(req.headers['authorization']).then(_ => this.languageController.deleteLanguage(req, res)).catch(_ => new InvalidTokenError(res))
        });
    }
}