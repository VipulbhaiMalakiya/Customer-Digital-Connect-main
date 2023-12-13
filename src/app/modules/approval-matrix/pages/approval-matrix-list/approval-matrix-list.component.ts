import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddUpdateApprovalMatrixComponent } from '../../components/add-update-approval-matrix/add-update-approval-matrix.component';
import { ViewApprovalMatrixComponent } from '../../components/view-approval-matrix/view-approval-matrix.component';
import { Subscription, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/_services/app.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Approvalmatrix } from 'src/app/_models/aproval-matrix';

@Component({
  selector: 'app-approval-matrix-list',
  templateUrl: './approval-matrix-list.component.html'
})


export class ApprovalMatrixListComponent implements OnInit {
  isProceess: boolean = true;
  masterName?: any;
  subscription?: Subscription;
  term: any;
  data: Approvalmatrix[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(


    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
  ) {
    this.titleService.setTitle("CDC - Approval Matrix List");
  }


  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/esclation-departments";
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
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateApprovalMatrixComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          departmentId: data.departmentId,
          usernameL1: data.L1Manager,
          usernameL2: data.L2Manager.flat().map((item: { username: any; }) => item.username),
          usernameL3: data.L3Manager.flat().map((item: { username: any; }) => item.username),
          status: data.status,
        }
        this.masterName = `/esclation-departments`;
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

  onEdit(dataItem: Approvalmatrix) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateApprovalMatrixComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddUpdateApprovalMatrixComponent;
    componentInstance.ApprovalmatrixMaster = dataItem;
    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          departmentId: data.departmentId,
          usernameL1: data.L1Manager,
          usernameL2: data.L2Manager.flat().map((item: { username: any; }) => item.username),
          usernameL3: data.L3Manager.flat().map((item: { username: any; }) => item.username),
          status: data.status,
        }
        this.masterName = `/esclation-departments/esclationDepartmentId/${dataItem?.id}`;
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



  onViewDetail(dataItem: Approvalmatrix) {
    const modalRef = this.modalService.open(ViewApprovalMatrixComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ViewApprovalMatrixComponent;
    componentInstance.ApprovalmatrixMaster = dataItem;
  }

  onDelete(dataItem: Approvalmatrix) {
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
        this.masterName = `/esclation-departments/esclationDepartmentId/${dataItem?.id}`;
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
}
