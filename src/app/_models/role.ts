import { UserMaster } from "./user";

export interface RoleMasterModel{
  roleId?:any;
  roleName?:any;
  createdBy?:UserMaster;
  updatedBy?:UserMaster;
  status?:any;
  createdDate?:any;
  updatedDate?:any;
  roleDescription?:any;
}
