import { UserMaster } from "./user";

export interface prodactCategoryMasterModel{
  productCategoryId?:any;
  productCategoryName?:any;
  productCategoryDescription?:any;
  status?:any;
  fileUrl?:any;
  filePath?:any;
  filename?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  file?:any;
}
