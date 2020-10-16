import { Translation } from '../model/translation.interface';
import { TranslationProject } from '../model/translationProject.interface';
import { CommonDao } from './common.dao';

export class TranslationDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getTranslations(projectId: number): Promise<any> {
        return this.commonDao.read("SELECT translations.id as tID, languages.id as lID, * FROM translations JOIN languages ON translations.languageID = languages.id WHERE projectID = $projectId;", {$projectId: projectId}).then(rows => {
            let translations: Translation[] = [];

            for (const translation of rows) {
                translations.push(
                    {
                        id: translation.tID,
                        fileName: translation.name,
                        file: translation.file,
                        type: translation.type,
                        date: translation.date,
                        language: {id: translation.lID, name: translation.name, acronym: translation.acronym},
                        project: translation.projectID,
                    });
            }

            return translations;
        })
    }

    public addTranslation(fileName: string, file: string, type: string, date: number, languageId: number, projectId: number): Promise<any> {
        let sqlRequest = "INSERT INTO translations (fileName, file, type, date, languageId, projectId) VALUES (?, ?, ?, ?, ?, ?)";
        return this.commonDao.write(sqlRequest, [fileName, file, type, date, languageId, projectId]);
    }

    public updateTranslation(id: number, fileName: string, file: string, type: string, date: number): Promise<any> {
        let sqlRequest = "UPDATE translations SET fileName = $fileName, file = $file, type = $type, date = $date WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id, $fileName: fileName, $file: file, $type: type, $date: date });
    }

    public deleteTranslation(id: number): Promise<any> {
        console.log(id);
        let sqlRequest = "DELETE FROM translations WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id });
    }
}