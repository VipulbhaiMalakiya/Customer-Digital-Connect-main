import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddUpdateApprovalMatrixComponent } from '../../components/add-update-approval-matrix/add-update-approval-matrix.component';
import { ViewApprovalMatrixComponent } from '../../components/view-approval-matrix/view-approval-matrix.component';

@Component({
  selector: 'app-approval-matrix-list',
  templateUrl: './approval-matrix-list.component.html'
})


export class ApprovalMatrixListComponent implements OnInit {
  isProceess: boolean = true;



  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private titleService: Title
  ) {
    this.titleService.setTitle("CDC - Approval Matrix List");
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateApprovalMatrixComponent, { size: "lg" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
  }

  ngOnInit(): void {
    this.isProceess = false;
  }

  onViewDetail() {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewApprovalMatrixComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
  }

  onDelete() {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this Delete approval matrix master?";
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
