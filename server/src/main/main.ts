import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import logger from 'morgan'
import methodOverride from 'method-override'
import { Request, Response, Application } from 'express';
import { Connector } from './connector';
import { Session } from './session';
import { UserRoutes } from '../route/user.routes';
import { RoleRoutes } from '../route/role.routes';
import { ProjectRoutes } from '../route/project.routes';
import { TranslationProjectRoutes } from '../route/translation.project.routes';
import { LanguageRoutes } from '../route/language.routes';

export class Main {

    // express server and database connector
    private app: Application;
    private connector: Connector;
    private session: Session; 

    // entitiy routes
    private userRoutes: UserRoutes;
    private roleRoutes: RoleRoutes;
    private projectRoutes: ProjectRoutes;
    private translationProjectRoutes: TranslationProjectRoutes;

    private languageRoutes: LanguageRoutes;

    constructor() {
        this.app = express();
        this.connector = new Connector();
        this.session = new Session();

        this.initServer();
        this.userRoutes = new UserRoutes(this.app, this.session);
        this.roleRoutes = new RoleRoutes(this.app, this.session);
        this.projectRoutes = new ProjectRoutes(this.app, this.session);
        this.translationProjectRoutes = new TranslationProjectRoutes(this.app, this.session);
        
        this.languageRoutes = new LanguageRoutes(this.app, this.session);
    }

    private initServer(): void {
        this.app.listen(3001, () => {
            console.log('Server runs on port 3001')
        });

        // express server settings
        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(methodOverride());
        this.app.use(cors());
    
    }
}