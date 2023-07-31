import { SLATimelinesMasterModel } from "./SLA-Timelines";
import { subCategoryMasterModel } from "./subCategoryMasterModel";
import { UserMaster } from "./user";

export class servicetitleMasterModel {
  serviceId?:any;
  serviceName?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  status?:any;
  subCategoryName?:any;
  categoryName?:any;
  defaultPriority?:SLATimelinesMasterModel;
  subCategoryId?:any;
  categoryId?:any;
  subCategory?:subCategoryMasterModel
}
