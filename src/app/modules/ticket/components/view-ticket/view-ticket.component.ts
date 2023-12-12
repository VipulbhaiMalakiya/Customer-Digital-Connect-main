import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ticketMasterModel } from 'src/app/_models/ticket';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent {
  private _tickettsMaster: ticketMasterModel | undefined;
  isProceess: boolean = false;
  ticketMasterForm: any;

  set ticketsMaster(value: ticketMasterModel) {
    this._tickettsMaster = value;
    let updatedBy:any = ' '
    if(this._tickettsMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._tickettsMaster.updatedBy?.firstName + ' ' + this._tickettsMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }

    let createForUser:any = ' '
    if(this._tickettsMaster.createForUser?.firstName  != undefined ){
      createForUser = this._tickettsMaster.createForUser?.firstName + ' '+ this._tickettsMaster.createForUser?.lastName
    }
    else{
      createForUser = ''
    }

    console.log(this._tickettsMaster);

    if (this._tickettsMaster) {
      this.ticketMasterForm.patchValue({
        ticketId: this._tickettsMaster.ticketId,
        category: this._tickettsMaster.category?.categoryName,
        subCategory: this._tickettsMaster.subCategory?.subCategoryName,
        serviceTitle: this._tickettsMaster.serviceTitle?.serviceName,
        alternativeContactNo: this._tickettsMaster.alternativeContactNo,
        priority: this._tickettsMaster.priority?.priorityName,
        issue: this._tickettsMaster.issue?.issueName,
        department: this._tickettsMaster.department?.departmentName,
        assignedTo: this._tickettsMaster.assignedTo?.firstName + ' ' + this._tickettsMaster.assignedTo?.lastName,
        shortNotes: this._tickettsMaster.shortNotes,
        additionalComments: this._tickettsMaster.additionalComments,
        status: this._tickettsMaster.status,
        createForUser: createForUser,
        createdDate: moment(this._tickettsMaster.createdDate || '').format("llll"),
        createdBy: this._tickettsMaster.createdBy?.firstName + ' ' + this._tickettsMaster.createdBy?.lastName,
        updatedDate: moment(this._tickettsMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
        emailId: this._tickettsMaster.emailId,
        file: this._tickettsMaster.filename,
      });
      this.ticketMasterForm.controls["issue"].disable();
      this.ticketMasterForm.controls["ticketId"].disable();
      this.ticketMasterForm.controls["category"].disable();
      this.ticketMasterForm.controls["createdDate"].disable();
      this.ticketMasterForm.controls["subCategory"].disable();
      this.ticketMasterForm.controls["serviceTitle"].disable();
      this.ticketMasterForm.controls["department"].disable();
      this.ticketMasterForm.controls["additionalComments"].disable();
      this.ticketMasterForm.controls["priority"].disable();
      this.ticketMasterForm.controls["emailId"].disable();
      this.ticketMasterForm.controls["alternativeContactNo"].disable();
      this.ticketMasterForm.controls["shortNotes"].disable();
      this.ticketMasterForm.controls["assignedTo"].disable();
      this.ticketMasterForm.controls["createForUser"].disable();
      this.ticketMasterForm.controls["createdBy"].disable();
      this.ticketMasterForm.controls["updatedDate"].disable();
      this.ticketMasterForm.controls["updatedBy"].disable();
      this.ticketMasterForm.controls["file"].disable();
    }
  }
  goToLink() {
    window.open(this._tickettsMaster?.filePath, "_blank");
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.ticketMasterForm = this.formBuilder.group({
      subCategory: ['', [Validators.required]],
      category: ['', [Validators.required]],
      serviceTitle: ['', [Validators.required]],
      alternativeContactNo: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]],
      priority: ['', [Validators.required]],
      issue: ['', [Validators.required]],
      department: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
      shortNotes: ['', [Validators.required]],
      additionalComments: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createForUser: ['', [Validators.required]],
      file: [""],
      ticketId: [""],
      createdDate: [""],
      emailId: [""],
      createdBy: [""],
      updatedDate: [""],
      updatedBy: [""]
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
