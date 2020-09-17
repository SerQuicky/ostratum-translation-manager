import { Session } from '../main/session';
import { Role } from '../model/role.interface';
import { CommonDao } from './common.dao';

export class RoleDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getRoles(): Promise<any> {
        return this.commonDao.read("SELECT * FROM roles;", {}).then(rows => {
            let roles: Role[] = [];

            for (const role of rows) {
                roles.push(
                    {
                        id: role.id,
                        name: role.name,
                    });
            }

            return roles;
        })
    }

    public addRole(roleName: string): Promise<any> {
        let sqlRequest = "INSERT INTO roles (name) VALUES (?)";
        return this.commonDao.write(sqlRequest, [roleName]);
    }

    public addUserToRole(userId: number, roleID: number): Promise<any> {
        let sqlRequest = "INSERT INTO user_roles (userID, roleID) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [userId, roleID]);
    }

    public updateRole(oldName: string, newName: string): Promise<any> {
        let sqlRequest = "UPDATE roles SET name = $newName WHERE name = $oldName";
        return this.commonDao.write(sqlRequest, { $oldName: oldName, $newName: newName });
    }

    public deleteRole(roleName: string): Promise<any> {
        let sqlRequest = "DELETE FROM roles WHERE name = $roleName";
        return this.commonDao.write(sqlRequest, { $roleName: roleName });
    }
}