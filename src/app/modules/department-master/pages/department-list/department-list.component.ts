import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditeDepartmentMasterComponent } from '../../components/add-edite-department-master/add-edite-department-master.component';
import { ViewDepartmentMasterComponent } from '../../components/view-department-master/view-department-master.component';
import { departmentMasterModel } from 'src/app/_models/department';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit, OnDestroy {

  isProceess: boolean = true;
  term: any;
  data: departmentMasterModel[] = [];
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
    this.titleService.setTitle("CDC - Department List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }
  fatchData() {
    this.isProceess = true;
    this.masterName = "/department"
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
        "Id": x.departmentId || '',
        "Name": x.departmentName || '',
        "Code": x.departmentCode || '',
        "Head": x.departmentHead || '',
        "Description": x.description || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Name", "Code", "Head", "Description",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Department-Master", headers);
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeDepartmentMasterComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: departmentMasterModel) => {
      if (data) {
        var model: departmentMasterModel = {
          departmentName: data.departmentName.trim(),
          departmentCode: data.departmentCode,
          departmentHead: data.departmentHead.trim(),
          description: data.description.trim(),
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/department`;
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


  onEdit(dataItem: departmentMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeDepartmentMasterComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeDepartmentMasterComponent;
    componentInstance.departmentMaster = dataItem;

    modalRef.result.then((data: departmentMasterModel) => {
      if (data) {
        var model: departmentMasterModel = {
          departmentName: data.departmentName.trim(),
          departmentCode: dataItem.departmentCode,
          departmentHead: data.departmentHead.trim(),
          description: data.description.trim(),
          updatedBy: this.userData.userId,
          status: data.status,
          departmentId: dataItem.departmentId
        }
        this.masterName = `/department/${dataItem?.departmentId}`;
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

  onViewDetail(dataItem: departmentMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewDepartmentMasterComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewDepartmentMasterComponent;
    componentInstance.departmentMaster = dataItem;
  }

  onDelete(dataItem: departmentMasterModel) {
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
        this.masterName = `/department/${dataItem?.departmentId}`;
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
