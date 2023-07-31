import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { orderMasterModel } from 'src/app/_models/order';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  private _nvoiceMaster: orderMasterModel | undefined;
  isProceess: boolean = false;
  data?: any;
  date?:any;
  orderDetail?:any;

  set invoiceDownload(value: orderMasterModel) {
    this._nvoiceMaster = value;
    this.data = value;
  }

  ngOnInit(): void {
    this.orderDetail = this.data?.orderDetails;
    this.date = moment(this.data.createdDate || '').format("llll");
    console.log(this.date);

  }
}
