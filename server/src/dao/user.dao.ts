import { Session } from '../main/session';
import { User } from '../model/user.interface';
import { Role } from '../model/role.interface';
import { CommonDao } from './common.dao';
import { DaoSuccess } from './common.success';

export class UserDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public getUsers(): Promise<any> {
        return this.commonDao.read("SELECT id, username FROM users", {}).then(rows => {
            let users: User[] = [];

            for (const user of rows) {
                users.push(
                    {
                        id: user.id,
                        username: user.username,
                        password: ""
                    });
            }

            return users;
        })
    }

    public async register(user: User): Promise<any> {
        let sqlRequest = "INSERT INTO users (username, password) VALUES (?, ?)";
        const response = await this.commonDao.write(sqlRequest, [user.username, user.password]);
        return response.result ? this.addNormalUserRole(response.result[0]['lastID']) : new Promise((resolve, reject) => resolve());
    }

    public addNormalUserRole(userId: number): Promise<any> {
        let sqlRequest = "INSERT INTO user_roles (userID, roleID) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [userId, 2]);
    }

    public authenticate(session: Session, shouldAddToken: boolean, username: string, password: string): Promise<any> {
        return this.commonDao.read("SELECT * FROM users JOIN user_roles ON users.id = user_roles.userID " + 
                                    "JOIN roles ON user_roles.roleID = roles.id WHERE username = $username", { $username: username }).then(async rows => {
            let user: User =  {
                id: 0,
                username: rows[0].username,
                password: rows[0].password,
            };

            let token: string = "";
            const adminRole = rows.some((row: any) => row.roleID == 1);
            if(shouldAddToken) {
                token = await session.add(adminRole, user.username);
            }

            return {result: user, password: password, token: token, admin: adminRole};
        });
    }

    public deleteUser(id: number): Promise<any> {
        return this.commonDao.write("DELETE FROM users WHERE id = $id", {$id: id});
    }

    public updateUser(id: number, username: string, password: string): Promise<any> {
        return this.commonDao.write("UPDATE users SET username = $username, password = $password WHERE id = $id", {$id: id, $username: username, $password: password});
    }

    public changePassword(username: string, password: string): Promise<any> {
        return this.commonDao.write("UPDATE users SET password = $password WHERE username = $username", 
                                    { $username: username, $password: password });
    }
}