import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { issueMasterModel } from 'src/app/_models/issue';
import { AppService } from 'src/app/_services/app.service';
import { AddEditeIssueComponent } from 'src/app/modules/issue/components/add-edite-issue/add-edite-issue.component';
import { ViewIssueComponent } from 'src/app/modules/issue/components/view-issue/view-issue.component';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { labelMasterModel } from 'src/app/_models/labels';
import { LabelAddEditeComponent } from '../../components/label-add-edite/label-add-edite.component';
import { LabelViewComponent } from '../../components/label-view/label-view.component';

@Component({
  selector: 'app-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.css'],
})
export class LabelsListComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: labelMasterModel[] = [];
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
    private apiService: ApiService
  ) {
    this.titleService.setTitle('CDC - Labels Master');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = '/label';
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data.data;
            this.count = this.data.length;
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
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(LabelAddEditeComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: labelMasterModel) => {
        if (data) {
          var model: labelMasterModel = {
            labelName: data.labelName.trim(),
            createdBy: this.userData.userId,
            status: data.status,
          };
          this.masterName = `/label`;
          let addData: any = {
            url: this.masterName,
            model: model,
          };
          this.isProceess = true;
          this.subscription = this.apiService
            .add(addData)
            .pipe(take(1))
            .subscribe(
              (res) => {
                if (res.status == 'Success') {
                  this.isProceess = false;
                  this.fatchData();
                  this.toastr.success(res.message);
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

  onEdit(dataItem: labelMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(LabelAddEditeComponent, {
      size: 'sm',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as LabelAddEditeComponent;
    componentInstance.issuesMaster = dataItem;
    modalRef.result
      .then((data: labelMasterModel) => {
        if (data) {
          var model: labelMasterModel = {
            labelName: data.labelName.trim(),
            updatedBy: this.userData.userId,
            status: data.status,
            labelId: dataItem.labelId,
          };
          this.masterName = `/label/${dataItem?.labelId}`;
          let updateData: any = {
            url: this.masterName,
            model: model,
          };
          this.isProceess = true;
          this.subscription = this.apiService
            .update(updateData)
            .pipe(take(1))
            .subscribe(
              (res) => {
                if (res.status == 'Success') {
                  this.isProceess = false;
                  this.fatchData();
                  this.toastr.success(res.message);
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

  onViewDetail(dataItem: labelMasterModel) {
    const modalRef = this.modalService.open(LabelViewComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as LabelViewComponent;
    componentInstance.issuesMaster = dataItem;
  }

  onDownload() {
    const exportData = this.data.map((x) => {
      let updatedBy: any = ' ';
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName;
      } else {
        updatedBy = '';
      }
      return {
        Id: x.labelId || '',
        Name: x.labelName || '',
        'Created By':
          x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        'Created Date': moment(x.createdDate || '').format('llll'),
        'Updated By': updatedBy,
        'Updated Date': moment(x.updatedDate || '').format('llll'),
        Status: x.status ? 'Active' : 'Deactivate',
      };
    });
    const headers = [
      'Id',
      'Name',
      'Created By',
      'Created Date',
      'Updated By',
      'Updated Date',
      'Status',
    ];
    this.appService.exportAsExcelFile(exportData, 'labels-Master', headers);
  }

  onDelete(dataItem: labelMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message =
      'Are you sure you want to delete this?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.masterName = `/label/${dataItem?.labelId}`;
          this.isProceess = true;
          this.subscription = this.apiService
            .deleteID(this.masterName)
            .pipe(take(1))
            .subscribe(
              (data) => {
                if (data.status == 'Success') {
                  this.isProceess = false;
                  this.toastr.success(data.message);
                  this.fatchData();
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
  onbulkUpload() {
    this.isProceess = true;
    const modalRef = this.modalService.open(BulkUploadComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as BulkUploadComponent;
    componentInstance.heading = 'Company';
    componentInstance.message =
      'Are you sure you want to delete this Delete Company master?';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
