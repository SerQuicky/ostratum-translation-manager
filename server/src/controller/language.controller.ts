import { Request, Response } from 'express';
import { LanguageDao } from '../dao/language.dao';
import { CommonController } from './common.controller';

export class LanguageController {

    private commonController: CommonController;
    private languageDao: LanguageDao;

    constructor() {
        this.commonController = new CommonController();
        this.languageDao = new LanguageDao();
    }

    public getLanguages(req: Request, res: Response): void {
        this.languageDao.getLanguages()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addLanguage(req: Request, res: Response): void {
        this.languageDao.addLanguage(req.body.name, req.body.acronym)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }


    public updateLanguage(req: Request, res: Response): void {
        this.languageDao.updateLanguage(req.body.id, req.body.name, req.body.acronym)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteLanguage(req: Request, res: Response): void {
        this.languageDao.deleteLanguage(req.body.id)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}