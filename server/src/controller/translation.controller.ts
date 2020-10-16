import { Request, Response } from 'express';
import { TranslationDao } from '../dao/translation.dao';
import { TranslationProjectDao } from '../dao/translation.project.dao';
import { CommonController } from './common.controller';

export class TranslationController {

    private commonController: CommonController;
    private translationDao: TranslationDao;

    constructor() {
        this.commonController = new CommonController();
        this.translationDao = new TranslationDao();
    }

    public getTranslations(req: Request, res: Response): void {
        this.translationDao.getTranslations(req.body.projectId)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addTranslation(req: Request, res: Response): void {
        this.translationDao.addTranslation(req.body.fileName, req.body.file, req.body.type, this.commonController.getDateTime(Date.now()), req.body.languageId, req.body.projectId)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }


    public updateTranslation(req: Request, res: Response): void {
        this.translationDao.updateTranslation(req.body.id, req.body.fileName, req.body.file, req.body.type, this.commonController.getDateTime(Date.now()))
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteTranslation(req: Request, res: Response): void {
        console.log(req.body.id);
        this.translationDao.deleteTranslation(req.body.id)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}