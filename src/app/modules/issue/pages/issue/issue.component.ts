import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditeIssueComponent } from '../../components/add-edite-issue/add-edite-issue.component';
import { ViewIssueComponent } from '../../components/view-issue/view-issue.component';
import { issueMasterModel } from 'src/app/_models/issue';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: issueMasterModel[] = [];
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
    this.titleService.setTitle("CDC - Isuue Master");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/issue";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data;
        this.count = this.data.length;
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
    const modalRef = this.modalService.open(AddEditeIssueComponent, { size: "md" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    modalRef.result.then((data: issueMasterModel) => {
      if (data) {
        var model: issueMasterModel = {
          issueName: data.issueName.trim(),
          calculationSLA: data.calculationSLA,
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/issue`;
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
          this.toastr.error(error.messages);
        });
      }
    }).catch(() => { });
  }


  onEdit(dataItem: issueMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeIssueComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeIssueComponent;
    componentInstance.issuesMaster = dataItem;
    modalRef.result.then((data: issueMasterModel) => {
      if (data) {
        var model: issueMasterModel = {
          issueName: data.issueName.trim(),
          calculationSLA: data.calculationSLA,
          updatedBy: this.userData.userId,
          status: data.status,
          issueId: dataItem.issueId
        }
        this.masterName = `/issue/${dataItem?.issueId}`;
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
          this.toastr.error(error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }

  onViewDetail(dataItem: issueMasterModel) {

    const modalRef = this.modalService.open(ViewIssueComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewIssueComponent;
    componentInstance.issuesMaster = dataItem;
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
        "Id": x.issueId || '',
        "issueName": x.issueName || '',
        "calculationSLA": x.calculationSLA || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "issueName", "calculationSLA",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Issue-Master", headers);
  }

  onDelete(dataItem: issueMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/issue/${dataItem?.issueId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(data => {
          this.isProceess = false;
          this.toastr.success(data.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.message);
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
    componentInstance.message = "Are you sure you want to delete this Delete Company master?";
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
