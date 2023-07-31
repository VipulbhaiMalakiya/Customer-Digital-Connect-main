import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { issueMasterModel } from 'src/app/_models/issue';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent {
  private _issueMaster: issueMasterModel | undefined;
  isProceess: boolean = false;
  issueForm: any;



  set issuesMaster(value: issueMasterModel) {
    this._issueMaster = value;
    let updatedBy:any = ' ';
    if(this._issueMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._issueMaster.updatedBy?.firstName + ' ' + this._issueMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._issueMaster) {
      this.issueForm.patchValue({
        issueName: this._issueMaster.issueName,
        calculationSLA:this._issueMaster.calculationSLA,
        status:this._issueMaster.status,
        issueId:this._issueMaster.issueId,
        createdDate:moment(this._issueMaster.createdDate || '').format("llll"),
        createdBy:this._issueMaster.createdBy?.firstName + ' ' + this._issueMaster.createdBy?.lastName,
        updatedDate: moment(this._issueMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.issueForm.controls["issueName"].disable();
      this.issueForm.controls["calculationSLA"].disable();
      this.issueForm.controls["status"].disable();
      this.issueForm.controls["issueId"].disable();
      this.issueForm.controls["createdDate"].disable();
      this.issueForm.controls["createdBy"].disable();
      this.issueForm.controls["updatedDate"].disable();
      this.issueForm.controls["updatedBy"].disable();
    }
  }


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.issueForm = this.formBuilder.group({
      issueName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
        calculationSLA:['', [Validators.required]],
        status:['', [Validators.required]],
        issueId:[""],
        createdDate:[''],
        createdBy:[''],
        updatedDate:[''],
        updatedBy:['']
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
