import { UserMaster } from "./user";

export interface issueMasterModel{
  issueId?:any;
  issueName?:any;
  calculationSLA?:any;
  createdBy?:UserMaster;
  status?:any;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
}
