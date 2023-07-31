import { UserMaster } from "./user";

export interface companyMasterModel{
  companyId?:any;
  companyName?:any;
  apiKey?:any;
  companyDescription?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  status?:boolean;
}
