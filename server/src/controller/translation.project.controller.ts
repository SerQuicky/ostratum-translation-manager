import { Request, Response } from 'express';
import { TranslationProjectDao } from '../dao/translation.project.dao';
import { CommonController } from './common.controller';

export class TranslationProjectController {

    private commonController: CommonController;
    private translationProject: TranslationProjectDao;

    constructor() {
        this.commonController = new CommonController();
        this.translationProject = new TranslationProjectDao();
    }

    public getTranslationProjects(req: Request, res: Response): void {
        this.translationProject.getTranslationProjects(req.body.projectId)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addTranslationProject(req: Request, res: Response): void {
        this.translationProject.addTranslationProject(req.body.name, req.body.description, req.body.projectId)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res));
    }


    public updateTranslationProject(req: Request, res: Response): void {
        this.translationProject.updateTranslationProject(req.body.id, req.body.name, req.body.description)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteTranslateProject(req: Request, res: Response): void {
        this.translationProject.deleteTranslateProject(req.body.id)
            .then(this.commonController.writeResult(res))
            .catch(this.commonController.serverError(res));
    }
}