import { Request, Response } from 'express';
import { ProjectDao } from '../dao/project.dao';
import { CommonController } from './common.controller';

export class ProjectController {

    private commonController: CommonController;
    private projectDao: ProjectDao;

    constructor() {
        this.commonController = new CommonController();
        this.projectDao = new ProjectDao();
    }

    public getProjects(req: Request, res: Response): void {
        this.projectDao.getProjects()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public getProjectOfUser(req: Request, res: Response): void {
        this.projectDao.getProjectOfUser(req.body.username)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addProject(req: Request, res: Response): void {
        this.projectDao.addProject(req.body.name)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addRoleToProject(req: Request, res: Response): void {
        this.projectDao.addRoleToProject(req.body.roleId, req.body.projectId)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public updateProject(req: Request, res: Response): void {
        this.projectDao.updateProject(req.body.id, req.body.newName)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteProject(req: Request, res: Response): void {
        this.projectDao.deleteProject(req.body.id)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}