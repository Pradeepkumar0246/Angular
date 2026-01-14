import { Role } from "./role.model";
export interface User {
userId?: string | null;
username?: string | null;
email?: string | null;
// password?: string | null; 
passwordHash?: string | null;
role:Role
}