import { Roles } from "./roles.model";

export class User {
  uid:string;
  name:string;
  email:string;
  roles:Roles;
}