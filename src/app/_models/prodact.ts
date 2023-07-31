import { UserMaster } from "./user";

export interface prodactMasterModel{
  productCategoryId?:any;
  productId?:any;
  serialNo?:any;
  productName?:any;
  productDescription?:any;
  productPrices?:productPrices
  ischeckboxGM250?:any;
  ischeckboxGM500?:any;
  ischeckboxKG1?:any;
  ischeckboxLT1?:any;
  options?:any;
  status?:any;
  fileUrl?:any;
  productCategory?:any;
  createdBy?:UserMaster;
  createdDate?:any;
  updatedBy?:UserMaster;
  updatedDate?:any;
  file?:any;
  ischeckboxPiece?:any;
  quantity?:any;
}

export interface productPrices {
  GM500Price?:number;
  KG1Price?:number;
  GM250Price?:number;
  PiecePrice?:number;
  lt1price?:number;
}
