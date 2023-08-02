import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { orderMasterModel } from 'src/app/_models/order';
import { AppService } from 'src/app/_services/app.service';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

import { InvoiceComponent } from 'src/app/modules/invoice/pages/invoice/invoice.component';
import { HttpClient } from '@angular/common/http';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { EditeComponent } from '../../components/edite/edite.component';
import { ViewComponent } from '../../components/view/view.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  isProceess: boolean = true;
  term: any;
  data: orderMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
    private http: HttpClient,
    public masterAPI: TickitService
  ) {
    this.titleService.setTitle('CDC - Orders');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = '/order';
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data.data;
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fatchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fatchData();
  }

  onEdit(dataItem: orderMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(EditeComponent, { size: 'lg' });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as EditeComponent;
    componentInstance.editeData = dataItem;
    modalRef.result
      .then((data: any) => {
        if (data) {
          this.masterName = `/order`;
          let updateData: any = {
            url: this.masterName,
            model: data,
          };
          this.isProceess = true;
          this.apiService
            .update(updateData)
            .pipe(take(1))
            .subscribe(
              (res) => {
                if (res.status === 'Success') {
                  this.toastr.success(res.message);
                  this.isProceess = false;
                  this.fatchData();
                  // this.masterAPI.downloadInvoice(res.data?.orderId);
                }
              },
              (error) => {
                if (error.error.status === 'failed') {
                  this.isProceess = false;
                  this.toastr.error(error.error.message);
                }
              }
            );
        }
      })
      .catch(() => {});
  }

  onViewDetail(dataItem: orderMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewComponent, { size: 'lg' });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewComponent;
    componentInstance.editeData = dataItem;
  }


  downloadInvoice(dataItem: orderMasterModel): void {
    const invoiceUrl = dataItem.fileUrl;
    if(invoiceUrl){
      window.open(invoiceUrl);
    }

  }
}
