import { UserMaster } from "./user";

export interface Customers {
  customerId?:any;
  firstName?:any;
  lastName?:any;
  email?:any;
  contact?:any;
  address?:any;
  state?:any;
  city?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  status?:any;
  postcode?:any;
}

export interface CustomersMasterModel{
  firstName?:any;
  lastName?:any;
  email?:any;
  contact?:any;
  address?:any;
  state?:any;
  city?:any;
  createdBy?:any;
  postcode?:any;
  status?:any;
}

export interface UpdateCustomersMasterModel{
  firstName?:any;
  lastName?:any;
  email?:any;
  contact?:any;
  address?:any;
  state?:any;
  city?:any;
  updatedBy?:any;
  postcode?:any;
  customerId?:any;
  status?:any;
}

export interface DeleteCustomersMasterModel {
  customerId?:any;
}
