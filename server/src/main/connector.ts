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
}