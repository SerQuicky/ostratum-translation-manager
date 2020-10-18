import { Database } from 'sqlite3'
import { ExampleDatabaseScript } from '../scripts/database';

export class Connector {

    private database: Database;
    private script: ExampleDatabaseScript;

    constructor() {
        this.database = new Database('./sqlite.db', async (err) => {
            if (err) {
                console.error(err.message);
            }
        });

        this.script = new ExampleDatabaseScript(this.database);
        this.initScript();
    }

    private async initScript() {
        await this.script.initTables();

        if(process.argv[2] == "example") {
            await this.script.initExampleData();
        } else if (process.argv[2] == "base") {
            await this.script.initBaseData();
        }
    }

    private createTables(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            await this.executeRequest("CREATE TABLE if not exists users (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " username TEXT," +
                " password TEXT," +
                " UNIQUE(username) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists roles (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " UNIQUE(name) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists user_roles (" +
                " userID INTEGER," +
                " roleID INTEGER," +
                " UNIQUE(userID, roleID), " +
                " FOREIGN KEY(userID) REFERENCES users(id), " +
                " FOREIGN KEY(roleID) REFERENCES roles(id) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists projects (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " description TEXT," +
                " UNIQUE(name) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists role_projects (" +
                " roleID INTEGER," +
                " projectID INTEGER," +
                " UNIQUE(roleID, projectID), " +
                " FOREIGN KEY(roleID) REFERENCES roles(id), " +
                " FOREIGN KEY(projectID) REFERENCES projects(id) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists translation_projects (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " projectID INTEGER," +
                " description TEXT," +
                " UNIQUE(name, projectID), " +
                " FOREIGN KEY(projectID) REFERENCES projects(id) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists languages (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " acronym TEXT," +
                " UNIQUE(name), " +
                " UNIQUE(acronym) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists translations (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " fileName TEXT," +
                " file TEXT," +
                " type TEXT," +
                " date INTEGER," + 
                " languageID INTEGER," +
                " projectID INTEGER," +
                " UNIQUE(languageID, projectID), " +
                " FOREIGN KEY(languageID) REFERENCES languages(id) " +
                " FOREIGN KEY(languageID) REFERENCES translation_projects(id) " +
                ")");

            resolve();
        });
    }

    private executeRequest(request: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.run(request, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}