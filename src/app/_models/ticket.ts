import { SLATimelinesMasterModel } from "./SLA-Timelines";
import { CategoryMasterModel } from "./category";
import { departmentMasterModel } from "./department";
import { issueMasterModel } from "./issue";
import { servicetitleMasterModel } from "./servicetitle";
import { subCategoryMasterModel } from "./subCategoryMasterModel";
import { UserMaster } from "./user";

export class ticketMasterModel {
  ticketId?:any;
  emailId?:any;
  category?:CategoryMasterModel;
  subCategory?:subCategoryMasterModel;
  serviceTitle?:servicetitleMasterModel;
  department?:departmentMasterModel;
  assignedTo?:UserMaster;
  alternativeContactNo?:any;
  priority?:SLATimelinesMasterModel;
  issue?:issueMasterModel;
  shortNotes?:any;
  additionalComments?:cooment;
  createdBy?:UserMaster;
  createForUser?:UserMaster;
  createdDate?:any;
  ticketNo?:any;
  updatedBy?:any;
  updatedDate?:any;
  status?:any;
  file?:any;
  fileUrl?:any;
  filePath?:any;
  workNotes?:any;
  filename?:any;
  ticketStatus?:any;
}

export class cooment {
  commentsId?:any;
  additionalMessage?:any;
  createdDate?:any;
  ticketId?:any;
  userId?:any;
  filePath?:any;
  filename?:any;
}
