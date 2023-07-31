import { UserMaster } from "./user";

export interface departmentMasterModel{
  departmentId?:any;
  departmentName?:any;
  departmentCode?:any;
  departmentHead?:any;
  description?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedDate?:any;
  updatedBy?:UserMaster;
  status?:any;
}
