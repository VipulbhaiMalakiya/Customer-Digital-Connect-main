import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditeCompanyComponent } from '../../components/add-edite-company/add-edite-company.component';
import { ViewCompanyComponent } from '../../components/view-company/view-company.component';
import { companyMasterModel } from 'src/app/_models/company';
import * as moment from 'moment';
import { AppService } from 'src/app/_services/app.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, delay, take } from 'rxjs';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: companyMasterModel[] = [];
  userData: any;
  subscription?: Subscription;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private titleService: Title,
    private appService: AppService,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {
    this.titleService.setTitle("CDC - Company List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/company";
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
    const modalRef = this.modalService.open(AddEditeCompanyComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result.then((data: companyMasterModel) => {
      if (data) {
        var model: companyMasterModel = {
          companyName: data.companyName.trim(),
          createdBy: this.userData.userId,
          apiKey: data.apiKey.trim(),
          companyDescription: data.companyDescription.trim(),
          status: data.status,
        }
        this.masterName = `/company`;
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
          this.toastr.error("Company details not saved");
        });
        // this.NgRxAPI.addCompany(model);
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
        "Id": x.companyId || '',
        "Company Name": x.companyName || '',
        "API Key": x.apiKey || '',
        "Description": x.companyDescription || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Company Name", "API Key", "Description",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"];
    this.appService.exportAsExcelFile(exportData, "Company-Master", headers);
  }

  onEdit(dataItem: companyMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeCompanyComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as AddEditeCompanyComponent;
    componentInstance.CompanyMaster = dataItem;
    modalRef.result.then((data: companyMasterModel) => {
      if (data) {
        var model: companyMasterModel = {
          updatedBy: this.userData.userId,
          companyName: data.companyName.trim(),
          companyDescription: data.companyDescription.trim(),
          apiKey: dataItem.apiKey.trim(),
          status: data.status,
          companyId: dataItem.companyId
        }
        this.masterName = `/company/${dataItem?.companyId}`;
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
          this.toastr.success(res.message);
          this.fatchData();
          this.isProceess = false;
        }, error => {
          this.toastr.error(error.message);
          this.isProceess = false;
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
  onViewDetail(dataItem: companyMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewCompanyComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewCompanyComponent;
    componentInstance.CompanyMaster = dataItem;
  }

  onDelete(dataItem: companyMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this Delete Company master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/company/${dataItem?.companyId}`;
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
