import { CategoryMasterModel } from "./category";
import { UserMaster } from "./user";

export class subCategoryMasterModel {
  subCategoryId?:any;
  subCategoryName?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  status?:any;
  categoryId?:any;
  categoryName?:any;
  updatedDate?:any;
  category?:CategoryMasterModel

}
