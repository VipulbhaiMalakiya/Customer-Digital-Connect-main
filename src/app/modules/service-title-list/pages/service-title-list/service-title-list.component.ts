import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditeServiceTitleComponent } from '../../components/add-edite-service-title/add-edite-service-title.component';
import { AppService } from 'src/app/_services/app.service';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import * as moment from 'moment';
import { ViewServiceTitleComponent } from '../../components/view-service-title/view-service-title.component';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';

@Component({
  selector: 'app-service-title-list',
  templateUrl: './service-title-list.component.html',
  styleUrls: ['./service-title-list.component.css']
})

export class ServiceTitleListComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: servicetitleMasterModel[] = [];
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
    private titleService: Title,
    private toastr: ToastrService,
    private appService: AppService,
    private apiService: ApiService
  ) {
    this.titleService.setTitle("CDC - Service Title");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }
  fatchData() {
    this.isProceess = true;
    this.masterName = "/servicetitle";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data;
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
    const modalRef = this.modalService.open(AddEditeServiceTitleComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: servicetitleMasterModel) => {
      if (data) {
        var model: servicetitleMasterModel = {
          serviceName: data.serviceName.trim(),
          createdBy: this.userData.userId,
          defaultPriority: data.defaultPriority,
          subCategoryId: data.subCategoryId,
          status: data.status,
        }
        this.masterName = `/servicetitle`;
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
  onEdit(dataItem: servicetitleMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeServiceTitleComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeServiceTitleComponent;
    componentInstance.serviceTitleMaster = dataItem;
    modalRef.result.then((data: servicetitleMasterModel) => {
      if (data) {
        var model: servicetitleMasterModel = {
          updatedBy: this.userData.userId,
          serviceName: data.serviceName.trim(),
          defaultPriority: data.defaultPriority,
          serviceId: dataItem.serviceId,
          status: data.status,
          subCategoryId: data.subCategoryId
        }
        this.masterName = `/servicetitle/${dataItem?.serviceId}`;
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
          this.toastr.error(error.messages);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }
  onDelete(dataItem: servicetitleMasterModel) {
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
        this.masterName = `/servicetitle/${dataItem?.serviceId}`;
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
  onViewDetail(dataItem: servicetitleMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewServiceTitleComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewServiceTitleComponent;
    componentInstance.serviceTitleMaster = dataItem;
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
        "Id": x.serviceId || '',
        "Service Name": x.serviceName || '',
        "Sub Category": x.subCategory?.category?.categoryName || '',
        "Category": x.subCategory?.subCategoryName || '',
        "Status": x.status ? 'Active' : 'Deactivate',
        "Priority": x.defaultPriority?.priorityName || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll")
      }
    });
    const headers = ["Id", "Service Name", "Sub Category", "Category", "Priority", "Created Date", "Created By",
      "Updated Date", "Updated By", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Service-Title-Master", headers);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
