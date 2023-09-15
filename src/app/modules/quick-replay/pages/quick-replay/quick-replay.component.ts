import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { labelMasterModel } from 'src/app/_models/labels';
import { AppService } from 'src/app/_services/app.service';
import { LabelAddEditeComponent } from 'src/app/modules/label-master/components/label-add-edite/label-add-edite.component';
import { LabelViewComponent } from 'src/app/modules/label-master/components/label-view/label-view.component';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { quickrepliesModel } from 'src/app/_models/quickreplies';
import { AddEditeQuickReplayComponent } from '../../components/add-edite-quick-replay/add-edite-quick-replay.component';
import { ViewQuickReplayComponent } from '../../components/view-quick-replay/view-quick-replay.component';

@Component({
  selector: 'app-quick-replay',
  templateUrl: './quick-replay.component.html',
  styleUrls: ['./quick-replay.component.css'],
})
export class QuickReplayComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: quickrepliesModel[] = [];
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
    this.titleService.setTitle('CDC - Quick Replay');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = '/quickreplies';
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
    const modalRef = this.modalService.open(AddEditeQuickReplayComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: quickrepliesModel) => {
        if (data) {
          var model: quickrepliesModel = {
            name: data.name.trim(),
            description: data.description.trim(),
          };
          this.masterName = `/quickreplies`;
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

  onEdit(dataItem: quickrepliesModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeQuickReplayComponent, {
      size: 'sm',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as AddEditeQuickReplayComponent;
    componentInstance.issuesMaster = dataItem;
    modalRef.result
      .then((data: quickrepliesModel) => {
        if (data) {
          var model: quickrepliesModel = {
            name: data.name.trim(),
            description: data.description.trim(),
          };
          this.masterName = `/quickreplies/${dataItem?.id}`;
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

  onViewDetail(dataItem: quickrepliesModel) {
    const modalRef = this.modalService.open(ViewQuickReplayComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ViewQuickReplayComponent;
    componentInstance.issuesMaster = dataItem;
  }

  onDownload() {
    const exportData = this.data.map((x) => {
      return {
        Id: x.id || '',
        Name: x.name || '',
        Description: x.description || '',
      };
    });
    const headers = ['Id', 'Name', 'Description'];
    this.appService.exportAsExcelFile(exportData, 'quick-replay', headers);
  }

  onDelete(dataItem: quickrepliesModel) {
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
    componentInstance.message = 'Are you sure you want to delete this ?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.masterName = `/quickreplies/${dataItem?.id}`;
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
