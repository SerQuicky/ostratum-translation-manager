import { Language } from '../model/language.interface';
import { CommonDao } from './common.dao';

export class LanguageDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getLanguages(): Promise<any> {
        return this.commonDao.read("SELECT * FROM languages;", {}).then(rows => {
            let languages: Language[] = [];

            for (const language of rows) {
                languages.push(
                    {
                        id: language.id,
                        name: language.name,
                        acronym: language.acronym

                    });
            }

            return languages;
        })
    }

    public addLanguage(name: string, acronym: string): Promise<any> {
        let sqlRequest = "INSERT INTO languages (name, acronym) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [name, acronym]);
    }

    public updateLanguage(id: number, name: string, acronym: string): Promise<any> {
        let sqlRequest = "UPDATE languages SET name = $name, acronym = $acronym WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id, $name: name, $acronym: acronym });
    }

    public deleteLanguage(id: number): Promise<any> {
        let sqlRequest = "DELETE FROM languages WHERE id = $id";
        return this.commonDao.write(sqlRequest, { $id: id });
    }
}