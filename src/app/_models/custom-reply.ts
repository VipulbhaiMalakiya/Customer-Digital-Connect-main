import { UserMaster } from "./user";

export interface customReplyMaster {
  input?:any;
  inputVariations?:any;
  messageBody?:any;
  createdBy?:UserMaster;
  updatedBy?:UserMaster;
  autoReplyId?:any;
}
