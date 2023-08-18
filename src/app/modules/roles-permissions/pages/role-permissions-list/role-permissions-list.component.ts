import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddUpdateRolesPermissionsComponent } from '../../components/add-update-roles-permissions/add-update-roles-permissions.component';
import { ViewRolesPermissionsComponent } from '../../components/view-roles-permissions/view-roles-permissions.component';
import { RoleMasterModel } from 'src/app/_models/role';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';

@Component({
  selector: 'app-role-permissions-list',
  templateUrl: './role-permissions-list.component.html'
})
export class RolePermissionsListComponent implements OnInit,OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: RoleMasterModel[] = [];
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
    this.titleService.setTitle("CDC - Role & Permissions List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {

    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/role";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
      if(data){
        this.data = data;
        this.cd.detectChanges();
        this.isProceess = false;
      }

    },error => {
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
    const modalRef = this.modalService.open(AddUpdateRolesPermissionsComponent, { size: "md" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: RoleMasterModel) => {
      if (data) {
        var model: RoleMasterModel = {
          roleName: data.roleName.trim(),
          roleDescription: data.roleDescription.trim(),
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/role`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1),delay(1000)).subscribe(res => {
          this.isProceess = false;
          this.fatchData();
          // this.toastr.success(res.message);
          this.toastr.error("Role details not saved");
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.message);
        });
      }
    }).catch(() => { });
  }

  onEdit(dataItem: RoleMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateRolesPermissionsComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddUpdateRolesPermissionsComponent;
    componentInstance.roleMaster = dataItem;

    modalRef.result.then((data: RoleMasterModel) => {
      if (data) {
        var model: RoleMasterModel = {
          roleName: data.roleName.trim(),
          updatedBy: this.userData.userId,
          status: data.status,
          roleDescription: data.roleDescription.trim(),
          roleId: dataItem.roleId
        }
        this.masterName = `/role/${dataItem?.roleId}`;
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
          this.toastr.error(error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy:any = ' '
      if(x.updatedBy?.firstName  != undefined ){
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else{
        updatedBy = ''
      }
      return {
        "Id": x.roleId || '',
        "Name": x.roleName || '',
        "Desctiption": x.roleDescription || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Name", "Desctiption",
    "Created By", "Created Date","Updated By", "Updated Date","Status"
  ];
    this.appService.exportAsExcelFile(exportData, "Role-Permissions-Master", headers);
  }


  onViewDetail(dataItem: RoleMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewRolesPermissionsComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddUpdateRolesPermissionsComponent;
    componentInstance.roleMaster = dataItem;

  }

  onDelete(dataItem: RoleMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to role & permission ?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/role/${dataItem?.roleId}`;
        this.isProceess = true;
        this.subscription =   this.apiService.deleteID(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
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
