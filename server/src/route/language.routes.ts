import { Request, Response, Application } from 'express';
import { LanguageController } from '../controller/language.controller';
import { ProjectController } from '../controller/project.controller';
import { Session } from '../main/session';
import { InvalidTokenError } from './authentication.error';
import { CommonRoutes } from './common.routes';

export class LanguageRoutes {

    private app: Application;
    private languageController: LanguageController;
    private session: Session;
    private commonRoutes: CommonRoutes;

    constructor(app: Application, session: Session) {
        this.app = app;
        this.session = session;
        this.commonRoutes = new CommonRoutes();
        this.languageController = new LanguageController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/languages', (req: Request, res: Response) => {
            this.languageController.getLanguages(req, res)
        });

        this.app.post('/addLanguage', (req: Request, res: Response) => {
            this.languageController.addLanguage(req, res);
        });

        this.app.post('/updateLanguage', (req: Request, res: Response) => {
            this.languageController.updateLanguage(req, res);
        });

        this.app.post('/deleteLanguage', (req: Request, res: Response) => {
            this.languageController.deleteLanguage(req, res);
        });
    }
}