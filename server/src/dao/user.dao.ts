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

    public async register(user: User): Promise<any> {
        let sqlRequest = "INSERT INTO users (username, password) VALUES (?, ?)";
        const result = await this.commonDao.write(sqlRequest, [user.username, user.password]);
        return this.addNormalUserRole(result.message['lastID']);
    }

    public addNormalUserRole(userId: number): Promise<any> {
        let sqlRequest = "INSERT INTO user_roles (userID, roleID) VALUES (?, ?)";
        return this.commonDao.write(sqlRequest, [userId, 2]);
    }

    public authenticate(session: Session, username: string, password: string): Promise<any> {
        return this.commonDao.read("SELECT * FROM users JOIN user_roles ON users.id = user_roles.userID " + 
                                    "JOIN roles ON user_roles.roleID = roles.id WHERE username = $username", { $username: username }).then(async rows => {
            console.log(rows)
            let user: User =  {
                id: 0,
                username: rows[0].username,
                password: rows[0].password,
            };

            const adminRole = rows.some((row: any) => row.roleID == 1);
            const token: string = await session.add(adminRole);

            return {result: user, password: password, token: token };
        });
    }

    public changePassword(username: string, password: string): Promise<any> {
        return this.commonDao.write("UPDATE users SET password = $password WHERE username = $username", 
                                    { $username: username, $password: password });
    }
}