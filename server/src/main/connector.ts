import { Database } from 'sqlite3'

export class Connector {

    private database: Database;

    constructor() {
        this.database = new Database('./sqlite.db', async (err) => {
            if (err) {
                console.error(err.message);
            }

            await this.createTables();

            // adds entries to the tables, should only be use at the first server start
            //await this.addEntries();
        })
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

    private addEntries(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // user and roles
            await this.executeRequest("INSERT INTO roles (name) VALUES ('admin'), ('normal') ");
            await this.executeRequest("INSERT INTO users (username, password) VALUES ('Administrator', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG'), ('Test', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG') ");
            await this.executeRequest("INSERT INTO user_roles (userID, roleID) VALUES (1, 1), (2, 2) ");
            
            // projects and view rights
            await this.executeRequest("INSERT INTO projects (name, description) VALUES ('Apps', 'This is a translation project for all Ionic 5 Apps.') ");
            await this.executeRequest("INSERT INTO translation_projects (name, projectID, description) VALUES ('Game-App', 1, 'This is a description for the Gaming App.'), ('Invoice-App', 1, 'This is a description for the Invoice App.') ");
            await this.executeRequest("INSERT INTO role_projects (roleID, projectID) VALUES (1, 1), (2, 1) ");

            // language and translation files
            await this.executeRequest("INSERT INTO languages (name, acronym) VALUES ('English', 'EN'), ('German', 'DE') ");
            await this.executeRequest("INSERT INTO translations (fileName, file, type, date, languageID, projectID) VALUES ('en.json', '" + JSON.stringify({"GENERAL": {"APP": "HELLO"} }) + "', 'json', 20200921143000, 1, 1), ('de.json', '" + JSON.stringify({"GENERAL": {"APP": "HALLO"} }) + "', 'json', 20200921143000, 2, 1)");


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