import { createCipheriv, randomBytes, createHash } from "crypto";
import { JWT } from "../model/jwt.interface";
import { Role } from "../model/role.interface";

// TODO: Add to an env file
const ENCRYPTION_KEY = "d6F3Efeqd6F3Efeqd6F3Efeqd6F3Efeq"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
const TOKEN_EXPIRE_TIME = 3600000; // For AES, this is always 16

export class Session {

    private jwts: JWT[] = [];

    constructor() {}

    public add(adminRole: boolean): Promise<string> {
        this.jwts = this.jwts.filter(jwt => jwt.expireDate > Date.now());
        return new Promise((resolve, reject) => {
            try {
                // generate a base hashes and the a random IV
                let baseHash: string = createHash('sha1').digest('hex');
                let object = {hash: baseHash, adminRole: adminRole};
                let iv = randomBytes(IV_LENGTH);

                // generate the cipher text (token)
                var cipher = createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
                let encrypted = cipher.update(JSON.stringify(object));
                encrypted = Buffer.concat([encrypted, cipher.final()]);
    
                // add it to the session list and return it
                this.jwts.push({token: encrypted.toString('hex'), admin: adminRole, expireDate: Date.now() + TOKEN_EXPIRE_TIME})

                console.log(this.jwts);

                resolve(encrypted.toString('hex'));

            } catch(err: any) {
                reject(err);
            }
        });
    }

    public verify(token: string): Promise<any> {
        return new Promise((resolve, reject) => { 
            const result = this.jwts.some(jwt => jwt.token == token && jwt.expireDate > Date.now());
            if(!result) {
                resolve({state: false, message: "ERROR.TOKEN_EXPIRED"})
            }

            resolve({state: true, message: ""});
        });
    }

    public verifyAdmin(token: string): Promise<any> {
        return new Promise((resolve, reject) => { 
            const result = this.jwts.some(jwt => jwt.token == token && jwt.admin && jwt.expireDate > Date.now());
            if(!result) {
                reject({state: false, message: "ERROR.TOKEN_EXPIRED_OR_INVALID"})
            }

            resolve({state: true, message: ""});
        });
    }

    public update(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => { 
            const result = this.jwts.some(jwt => jwt.token == token);
            if(!result) {
                reject(false)
            }

            // update old jwt
            this.jwts = this.jwts.map(jwt => {
                if(jwt.token == token) {
                    return {token: jwt.token, admin: jwt.admin, expireDate: Date.now() + TOKEN_EXPIRE_TIME}
                }

                return jwt;
            });

            resolve(result);
        });
    }

}