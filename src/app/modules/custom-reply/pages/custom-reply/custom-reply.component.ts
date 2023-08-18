import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AppService } from 'src/app/_services/app.service';
import { AddEditeIssueComponent } from 'src/app/modules/issue/components/add-edite-issue/add-edite-issue.component';
import { ViewIssueComponent } from 'src/app/modules/issue/components/view-issue/view-issue.component';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { customReplyMaster } from 'src/app/_models/custom-reply';
import { AddEditeCustomReplyComponent } from '../../components/add-edite-custom-reply/add-edite-custom-reply.component';
import { ViewCustomReplyComponent } from '../../components/view-custom-reply/view-custom-reply.component';

@Component({
  selector: 'app-custom-reply',
  templateUrl: './custom-reply.component.html',
  styleUrls: ['./custom-reply.component.css']
})
export class CustomReplyComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: customReplyMaster[] = [];
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
  ) {
    this.titleService.setTitle("CDC -Custom Auto Reply");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/auto-reply";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.isProceess = false;
        this.cd.detectChanges();
      }

    }, error => {
      this.isProceess = false;
    })
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

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeCustomReplyComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    modalRef.result.then((data: customReplyMaster) => {
      if (data) {
        var model: customReplyMaster = {
          input: data.input.trim(),
          inputVariations: data.inputVariations,
          messageBody: data.messageBody.trim(),
          createdBy: this.userData.userId,
        }
        this.masterName = `/auto-reply`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1)).subscribe(res => {
          this.isProceess = false;
          this.fatchData();
          this.toastr.success(res.message);
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
          // this.toastr.error(error.message);
        });
      }
    }).catch(() => { });
  }


  onEdit(dataItem: customReplyMaster) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeCustomReplyComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeCustomReplyComponent;
    componentInstance.categoryMaster = dataItem;
    modalRef.result.then((data: customReplyMaster) => {
      if (data) {
        var model: customReplyMaster = {
          input: data.input.trim(),
          inputVariations: data.inputVariations,
          messageBody:data.messageBody,
          updatedBy: this.userData.userId,
          autoReplyId : dataItem.autoReplyId
        }
        this.masterName = `/auto-reply`;
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.fatchData();
        }, error => {
          this.toastr.error(error.error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }

  onViewDetail(dataItem: customReplyMaster) {

    const modalRef = this.modalService.open(ViewCustomReplyComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewCustomReplyComponent;
    componentInstance.categoryMaster = dataItem;
  }

  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy: any = ' '
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else {
        updatedBy = ''
      }
      return {
        "Id": x.autoReplyId || '',
        "Input": x.input || '',
        "Message": x.messageBody || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Updated By": updatedBy,
      }
    });
    const headers = ["Id", "Input","Message","Created By","Updated By",
    ];
    this.appService.exportAsExcelFile(exportData, "Custom Auto Reply", headers);
  }

  onDelete(dataItem: customReplyMaster) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this ?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/auto-reply/${dataItem?.autoReplyId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(data => {
          this.isProceess = false;
          this.toastr.success(data.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
        });
      }
    }).catch(() => { });
  }
  onbulkUpload() {
    this.isProceess = true;
    const modalRef = this.modalService.open(BulkUploadComponent, { size: "md", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as BulkUploadComponent;
    componentInstance.heading = "Company"
    componentInstance.message = "Are you sure you want to delete this ?";
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
