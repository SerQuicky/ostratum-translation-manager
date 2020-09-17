import { Role } from "./role.interface";

export interface JWT {
    token: string,
    admin: boolean,
    expireDate: number
}