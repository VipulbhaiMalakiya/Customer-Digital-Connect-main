import { UserMaster } from "./user";

export interface CategoryMasterModel{
  categoryId?:any;
  categoryName?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  status?:any;
}
