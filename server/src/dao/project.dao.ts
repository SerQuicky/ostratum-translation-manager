import { Project } from '../model/project.interface';
import { CommonDao } from './common.dao';

export class ProjectDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getProjects(): Promise<any> {
        return this.commonDao.read("SELECT * FROM projects;", {}).then(rows => {
            let projects: Project[] = [];

            for (const project of rows) {
                project.push(
                    {
                        id: project.id,
                        name: project.name,
                    });
            }

            return projects;
        })
    }

    public getProjectOfUser(username: string): Promise<any> {
        let sqlRequest = "SELECT projects.id as prID, projects.name as prName, * FROM projects JOIN role_projects ON projects.id = role_projects.projectID JOIN roles ON " +
                        "role_projects.roleID = roles.id JOIN user_roles ON user_roles.roleID = roles.id JOIN users ON users.id = user_roles.userID WHERE users.username = $username";
        return this.commonDao.read(sqlRequest, { $username: username }).then(rows => {
            let projects: Project[] = [];

            for (const project of rows) {
                project.push(
                    {
                        id: project.prID,
                        name: project.prName,
                    });
            }

            return projects;
        })
    }

    public addProject(name: string): Promise<any> {
        let sqlRequest = "INSERT INTO projects (name) VALUES (?)";
        return this.commonDao.write(sqlRequest, [name]);
    }

    public addRoleToProject(roleID: number, projectID: number): Promise<any> {
        let sqlRequest = "INSERT INTO role_projects (roleID, projectID) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [roleID, projectID]);
    }

    public updateProject(id: number, newName: string): Promise<any> {
        let sqlRequest = "UPDATE projects SET name = $newName WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id, $newName: newName });
    }

    public deleteProject(id: number): Promise<any> {
        let sqlRequest = "DELETE FROM projects WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id });
    }
}