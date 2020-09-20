import { Project } from '../model/project.interface';
import { CommonDao } from './common.dao';

export class ProjectDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getProjects(): Promise<any> {
        return this.commonDao.read("SELECT * FROM projects;", {}).then(rows => {
            console.log(rows);
            let projects: Project[] = [];

            for (const project of rows) {
                projects.push(
                    {
                        id: project.id,
                        name: project.name,
                        description: project.description
                    });
            }
            console.log(projects);
            return projects;
        })
    }

    public getProjectOfUser(username: string): Promise<any> {
        console.log(username);
        console.log('yo')
        let sqlRequest = "SELECT projects.id as prID, projects.name as prName, * FROM projects JOIN role_projects ON projects.id = role_projects.projectID JOIN roles ON " +
                        "role_projects.roleID = roles.id JOIN user_roles ON user_roles.roleID = roles.id JOIN users ON users.id = user_roles.userID WHERE users.username = $username";
        return this.commonDao.read(sqlRequest, { $username: username }).then(rows => {
            let projects: Project[] = [];

            for (const project of rows) {
                projects.push(
                    {
                        id: project.prID,
                        name: project.prName,
                        description: project.description
                    });
            }

            return projects;
        })
    }

    public addProject(name: string, description: string): Promise<any> {
        let sqlRequest = "INSERT INTO projects (name, description) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [name, description]);
    }

    public addRoleToProject(roleID: number, projectID: number): Promise<any> {
        let sqlRequest = "INSERT INTO role_projects (roleID, projectID) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [roleID, projectID]);
    }

    public updateProject(id: number, newName: string, description: string): Promise<any> {
        let sqlRequest = "UPDATE projects SET name = $newName AND description = $description WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id, $newName: newName, $description: description });
    }

    public deleteProject(id: number): Promise<any> {
        let sqlRequest = "DELETE FROM projects WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id });
    }
}