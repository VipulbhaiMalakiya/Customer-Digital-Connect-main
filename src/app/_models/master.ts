export class Masters{
  MasterName:string="";
}
export interface CompanyMaster {
  Id?: any;
  Name?: any;
  Descirption?: any;
  ApiKey?: any
}

export interface ApprovalMatrixMaster{
  Id?: any;
}

export interface Department {
  Id?: any;
  Company?: any;
  Department ?: any;
  Desciption?: any
}

export interface User {
  Id?: any;
  FirstName?: any;
  LastName ?: any;
  Contact?: any;
  emailID?:any;
  Role?:any;
  UserId?:any;
  Password?:any;
}

export interface Roles_Permissions{
  Id?:any;
  RoleName?:any;
  Descirption?:any;
}
export interface Customers {
  Id?:any;
  FirstName?:any;
  LastName?:any;
  Contact?:any;
  EmailId?:any;
}

export interface MasterResponseModel {
  [x: string]: any;
  CompanyMaster:CompanyMaster[];
  Department:Department[];
  User:User[];
  Roles_Permissions:Roles_Permissions[];
  Customers:Customers[];
  DeleteMasterModel:DeleteMasterModel[];
}
export interface SaveMasterBaseModel {
    Mode: "Insert" | "Update" | "Delete";
    MasterName: "CompanyMaster" | "Department" | "User" | "Roles_Permissions" | "Customers" | "DeleteMasterModel"
    | "ApprovalMatrixMaster";
}


export interface InsertUpdateCompanyMasterModel extends SaveMasterBaseModel {
  Id?: any;
  Name?: any;
  Descirption?: any;
  ApiKey?: any
}

export interface InsertUpdateDepartmentMasterModel extends SaveMasterBaseModel {
  Id?: any;
  Company?: any;
  Department ?: any;
  Desciption?: any
}

export interface InsertUpdateUserMasterModel extends SaveMasterBaseModel {
  Id?: any;
  FirstName?: any;
  LastName ?: any;
  Contact?: any;
  emailID?:any;
  Role?:any;
  UserId?:any;
  Password?:any;
}

export interface InsertUpdateRoles_PermissionsMasterModel extends SaveMasterBaseModel {
  Id?:any;
  RoleName?:any;
  Descirption?:any;
}

export interface InsertUpdateCustomersMasterModel extends SaveMasterBaseModel {
  Id?:any;
  FirstName?:any;
  LastName?:any;
  Contact?:any;
  EmailId?:any;
}

export interface DeleteMasterModel extends SaveMasterBaseModel {
  id?: any;
}


