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
                " file BLOB," +
                " type TEXT," +
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
            await this.executeRequest("INSERT INTO roles (name) VALUES ('admin'), ('normal') ");
            await this.executeRequest("INSERT INTO users (username, password) VALUES ('Administrator', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG'), ('Test', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG') ");
            await this.executeRequest("INSERT INTO user_roles (userID, roleID) VALUES (1, 1), (2, 2) ");

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