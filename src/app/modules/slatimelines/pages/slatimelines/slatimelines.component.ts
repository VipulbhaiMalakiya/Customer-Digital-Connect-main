import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ViewSlatimelinesComponent } from '../../components/view-slatimelines/view-slatimelines.component';
import { AddEditeSlatimelinesComponent } from '../../components/add-edite-slatimelines/add-edite-slatimelines.component';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/_services/app.service';
import { SLATimelinesMasterModel } from 'src/app/_models/SLA-Timelines';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-slatimelines',
  templateUrl: './slatimelines.component.html',
  styleUrls: ['./slatimelines.component.css']
})
export class SlatimelinesComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: SLATimelinesMasterModel[] = [];
  subscription?: Subscription;
  loading = false;
  error = false;
  isAlive = true;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    private appService: AppService,
    private apiService: ApiService,
  ) {
    this.titleService.setTitle("CDC - SLA Timelines");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/SLA";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
     if(data){
      this.data = data;
      this.count = this.data.length;
      this.cd.detectChanges();
      this.isProceess = false;
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
    const modalRef = this.modalService.open(AddEditeSlatimelinesComponent, { size: "md" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result.then((data: SLATimelinesMasterModel) => {
      if (data) {
        var model: SLATimelinesMasterModel = {
          priorityName: data.priorityName.trim(),
          slaTimeInHours: data.slaTimeInHours,
          status: data.status,
          createdBy: this.userData.userId,
        }
        this.masterName = `/SLA`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1),delay(1000)).subscribe(res => {
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


  onEdit(dataItem: SLATimelinesMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeSlatimelinesComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as AddEditeSlatimelinesComponent;
    componentInstance.slaMaster = dataItem;

    modalRef.result.then((data: SLATimelinesMasterModel) => {
      if (data) {
        var model: SLATimelinesMasterModel = {
          priorityName: data.priorityName.trim(),
          slaTimeInHours: data.slaTimeInHours,
          status: data.status,
          updatedBy: this.userData.userId,
          id: dataItem.id
        }
        this.masterName = `/SLA/${dataItem?.id}`;
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.update(updateData).pipe(take(1),delay(1000)).subscribe(res => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.fatchData();
        }, error => {
          this.toastr.error(error.messages);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
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
        "Id": x.id || '',
        "priorityName": x.priorityName || '',
        "slaTimeInHours": x.slaTimeInHours || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "priorityName", "slaTimeInHours",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"];
    this.appService.exportAsExcelFile(exportData, "SLA Timelines Master", headers);
  }

  onViewDetail(dataItem: SLATimelinesMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewSlatimelinesComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewSlatimelinesComponent;
    componentInstance.slaMaster = dataItem;
  }

  onDelete(dataItem: SLATimelinesMasterModel) {
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
        this.masterName = `/SLA/${dataItem?.id}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
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
