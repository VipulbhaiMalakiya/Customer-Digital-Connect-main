// import { Role } from "./role";

import { departmentMasterModel } from "./department";
import { RoleMasterModel } from "./role";

export interface UserMaster {
  userId?:number | undefined;
  username?:any;
  firstName?:any;
  lastName?:any;
  email?:any;
  contact?:any;
  address?:any;
  state?:any;
  city?:any;
  postcode?:any;
  createdBy?:any;
  createdDate?:any;
  updatedBy?:any;
  updatedDate?:any;
  status?:any;
  roleId?:any;
  departmentId?:any;
  departmentName?:any;
  password:any;
  department?:departmentMasterModel;
  role?:RoleMasterModel;

}
