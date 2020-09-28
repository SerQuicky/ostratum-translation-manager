import { Database, Statement } from 'sqlite3'
import { ServerResponse } from '../model/response.interface';
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
    public write(sqlRequest: string, sqlParams: any): Promise<ServerResponse<any>> {
        return new Promise((resolve, reject) => {
            let stmt: Statement = this.database.prepare(sqlRequest);
            stmt.run(sqlParams, function (err: any) {
                if (this.changes === 1) {
                    resolve({code: 200, message: "CODE_WRITE_SUCCESS", result: [{lastID: this.lastID}]});
                } else if (this.changes === 0) {
                    reject(
                        {code: 500, message: "CODE_ERROR_WRITE_ENTITIY", result: []}
                    )
                } else {
                    reject(
                        {code: 500, message: "CODE_ERROR_WRITE_ARGUMENT", result: []}
                    )
                }
            })
        });
    }
}