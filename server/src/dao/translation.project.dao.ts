import { TranslationProject } from '../model/translationProject.interface';
import { CommonDao } from './common.dao';

export class TranslationProjectDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getTranslationProjects(projectId: number): Promise<any> {
        return this.commonDao.read("SELECT * FROM translation_projects WHERE projectID = $projectId;", {$projectId: projectId}).then(rows => {
            let lprojects: TranslationProject[] = [];

            for (const lproject of rows) {
                lprojects.push(
                    {
                        id: lproject.id,
                        name: lproject.name,
                        description: lproject.description,
                        projectId: lproject.projectID 

                    });
            }

            return lprojects;
        })
    }

    public addTranslationProject(name: string, description: string, projectId: number): Promise<any> {
        let sqlRequest = "INSERT INTO translation_projects (name, description, projectId) VALUES (?, ?, ?)";
        return this.commonDao.write(sqlRequest, [name, description, projectId]);
    }

    public updateTranslationProject(id: number, name: string, description: string): Promise<any> {
        let sqlRequest = "UPDATE translation_projects SET name = $name, description = $description WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id, $name: name, $description: description });
    }

    public deleteTranslationProject(id: number): Promise<any> {
        let sqlRequest = "DELETE FROM translation_projects WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id });
    }
}