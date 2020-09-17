import { Database, Statement } from 'sqlite3'
import { DaoError } from './common.error';
import { DaoSuccess } from './common.success';

export class CommonDao {

    private database: Database;

    constructor() {
        this.database = new Database('./sqlite.db', async (err) => {
            if (err) {
                console.error(err.message);
            }
        })
    }

    // read request are requests that does not change the dabase entries
    public read(sqlRequest: string, sqlParams: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.all(sqlRequest, sqlParams, function (err: any, rows: any) {
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        })
    }

    // write request are requests that overwrite changes the dabase entries
    public write(sqlRequest: string, sqlParams: any): Promise<DaoSuccess | DaoError> {
        return new Promise((resolve, reject) => {
            let stmt: Statement = this.database.prepare(sqlRequest);
            stmt.run(sqlParams, function (err: any) {
                if (this.changes === 1) {
                    resolve(new DaoSuccess({lastID: this.lastID}));
                } else if (this.changes === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    )
                } else {
                    reject(
                        new DaoError(11, "Invalid arguments")
                    )
                }
            })
        });
    }
}