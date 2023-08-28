import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddUpdateUserComponent } from '../../components/add-update-user/add-update-user.component';
import { ViewUserComponent } from '../../components/view-user/view-user.component';
import { UserMaster } from 'src/app/_models';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit,OnDestroy {
  isProceess: boolean = true;
  data: UserMaster[] = [];
  userData: any;
  term: any;
  subscription?: Subscription;
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
    this.titleService.setTitle("CDC - Users List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.masterName = "/users";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
      this.data = data;
      this.cd.detectChanges();
      this.isProceess = false;
    },error => {
      this.isProceess = false;
    });
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
    const modalRef = this.modalService.open(AddUpdateUserComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: UserMaster) => {
      if (data) {
        var model: UserMaster = {
          username: data.username.trim(),
          password: data.password,
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          contact: `91${data.contact}`,
          address: data.address.trim(),
          state: data.state.trim(),
          city: data.city.trim(),
          postcode: data.postcode,
          roleId: data.roleId,
          departmentId: data.departmentId,
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/register`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription =  this.apiService.add(addData).pipe(take(1),delay(1000)).subscribe(res => {
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

  onEdit(dataItem: UserMaster) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateUserComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddUpdateUserComponent;
    componentInstance.usersMaster = dataItem;
    modalRef.result.then((data: UserMaster) => {
      if (data) {
        var model: any = {
          updatedBy: this.userData.userId,
          status: data.status,
          username: dataItem.username.trim(),
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          contact: data.contact,
          address: data.address.trim(),
          state: data.state.trim(),
          city: data.city.trim(),
          postcode: data.postcode,
          roleId: data.roleId,
          departmentId: data.departmentId,
          userId: dataItem.userId
        }

        this.masterName = `/users/${dataItem?.userId}`;
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
      return {
        "Id": x.userId || '',
        "Name": x.username || '',
        "First Name": x.firstName || '',
        "Last Name": x.lastName || '',
        "Email": x.email || '',
        "Contact": x.contact || '',
        "Address": x.address || '',
        "State": x.state || '',
        "City": x.city || '',
        "Post Code": x.postcode || '',
        "Department": x.department?.departmentName,
        "Role": x.role?.roleName || '',
        "Status": x.status ? 'Active' : 'Deactivate',
        "Created By": x.createdBy || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": x.updatedBy || '',
        "Updated Date": moment(x.updatedDate || '').format("llll")
      }
    });
    const headers = ["Id", "Name", "First Name", "Last Name", "Email", "Contact",
      "Address", "State", "City", "Post Code", "Department", "Role"
      , "Created Date", "Created By",
      "Updated Date", "Updated By","Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Users-Master", headers);

  }

  onViewDetail(dataItem: UserMaster) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewUserComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as ViewUserComponent;
    componentInstance.usersMaster = dataItem;
  }

  onDelete(dataItem: UserMaster) {
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
        this.masterName = `/users/${dataItem?.userId}`;
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
