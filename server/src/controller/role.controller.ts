import { Request, Response } from 'express';
import { RoleDao } from '../dao/role.dao';
import { CommonController } from './common.controller';

export class RoleController {

    private commonController: CommonController;
    private roleDao: RoleDao;

    constructor() {
        this.commonController = new CommonController();
        this.roleDao = new RoleDao();
    }

    public getRoles(req: Request, res: Response): void {
        this.roleDao.getRoles()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addRole(req: Request, res: Response): void {
        this.roleDao.addRole(req.body.name)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addUserToRole(req: Request, res: Response): void {
        this.roleDao.addUserToRole(req.body.userId, req.body.roleId)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public updateRole(req: Request, res: Response): void {
        this.roleDao.updateRole(req.body.oldName, req.body.newName)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public deleteRole(req: Request, res: Response): void {
        this.roleDao.deleteRole(req.body.name)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}