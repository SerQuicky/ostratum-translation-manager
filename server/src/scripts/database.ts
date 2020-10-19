import { Database } from 'sqlite3'

export class ExampleDatabaseScript { 

    private database: Database;

    constructor(private _database: Database) {
        this.database = _database;
    }


    public initTables(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            await this.executeRequest("CREATE TABLE if not exists users (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " username TEXT CHECK(username <> '')," +
                " password TEXT CHECK(password <> '')," +
                " UNIQUE(username) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists roles (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT CHECK(name <> '')," +
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
                " name TEXT CHECK(name <> '')," +
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
                " name TEXT CHECK(name <> '')," +
                " projectID INTEGER," +
                " description TEXT," +
                " UNIQUE(name, projectID), " +
                " FOREIGN KEY(projectID) REFERENCES projects(id) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists languages (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT CHECK(name <> '')," +
                " acronym TEXT CHECK(acronym <> '')," +
                " UNIQUE(name), " +
                " UNIQUE(acronym) " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists translations (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " fileName TEXT," +
                " file TEXT CHECK(file <> '')," +
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

    public initBaseData(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this.executeRequest("INSERT INTO roles (name) VALUES ('admin'), ('normal') ");
            await this.executeRequest("INSERT INTO users (username, password) VALUES ('Administrator', '$2b$10$tB7Dm2swpVZGJODPhgKdlukB0sdcPFXAx8DY0D1qOgaG9tu/mOgva') ");
            await this.executeRequest("INSERT INTO user_roles (userID, roleID) VALUES (1, 1) ");
        });
    }

    public initExampleData(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // user and roles
            await this.executeRequest("INSERT INTO roles (name) VALUES ('admin'), ('normal') ");
            await this.executeRequest("INSERT INTO users (username, password) VALUES ('Administrator', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG'), ('Test', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG'), ('Translator', '$2b$10$yI1EWvrkiuUkDJo/fu8GPOBD1B/5iBhtlivwInMHx3H6n/A1QjMKG') ");
            await this.executeRequest("INSERT INTO user_roles (userID, roleID) VALUES (1, 1), (2, 2), (3, 2) ");
            
            // projects and view rights
            await this.executeRequest("INSERT INTO projects (name, description) VALUES ('Apps', 'This is the first description.'), ('Games', 'This is the second description.'), ('Documents', 'This is the third description.') ");
            await this.executeRequest("INSERT INTO translation_projects (name, projectID, description) VALUES ('First App', 1, 'This is a description for first app.'), ('Second App', 1, 'This is a description for the second app.'), ('Third App', 1, 'This is a description for the third app.') ");
            await this.executeRequest("INSERT INTO role_projects (roleID, projectID) VALUES (2, 1), (2, 2), (2, 3) ");

            // language and translation files
            await this.executeRequest("INSERT INTO languages (name, acronym) VALUES ('English', 'EN'), ('German', 'DE'), ('French', 'FR') ");
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
