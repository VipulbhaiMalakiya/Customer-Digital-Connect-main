import { UserMaster } from "./user";

export interface orderMasterModel{
  orderDetails?:orderDetails;
  createdBy?:UserMaster;
  customerMob?:any;
  updatedBy?:any;
  createdDate?:any;
  updatedDate?:any;
  discount?:any;
  subtotal?:any;
  cgst?:any;
  sgst?:any;
  service?:any;
  grand?:any;
  totalAmount?:any;
  paymentType?:any;
  status?:any;
  orderId?:any;
  customer?:any;
  fileUrl?:any;
}


export interface orderDetails {
  productName?:any;
  ratemrp?:any;
  qantity?:any,
  amount?:any
}
