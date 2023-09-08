import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { labelMasterModel } from 'src/app/_models/labels';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-label-view',
  templateUrl: './label-view.component.html',
  styleUrls: ['./label-view.component.css']
})
export class LabelViewComponent {
  private _labelsMaster: labelMasterModel | undefined;
  isProceess: boolean = false;
  data:any;
  issueForm: any;

  get title(): string {
    return this._labelsMaster ? "Edit Labels Master" : " Add Labels Master";
  }

  set issuesMaster(value: labelMasterModel) {
    this._labelsMaster = value;
    this.data = value;
    let updatedBy:any = ' '
    if(this._labelsMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._labelsMaster.updatedBy?.firstName + ' ' + this._labelsMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._labelsMaster) {
      this.issueForm.patchValue({
        labelName: this._labelsMaster.labelName,
        status:this._labelsMaster.status ? 'Active' : 'Deactivate',
        createdDate:moment(this._labelsMaster.createdDate || '').format("llll"),
        createdBy:this._labelsMaster.createdBy?.firstName + ' ' + this._labelsMaster.createdBy?.lastName,
        updatedDate: moment(this._labelsMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.issueForm.controls["labelName"].disable();
      this.issueForm.controls["status"].disable();
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
      labelName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        noLeadingSpaceValidator(),
        Validators.pattern('^(?!\\s*$)[a-zA-Z\\s]*$')]],
        status: ['', [Validators.required]],
        categoryId:[''],
        createdDate:[''],
        createdBy:[''],
        updatedDate:[''],
        updatedBy:['']
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }


  onSubmit() {
    if (this.issueForm.valid) {
      this.activeModal.close(this.issueForm.value)
    } else {
      this.issueForm.controls['labelName'].markAsTouched();
      this.issueForm.controls['status'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.issueForm.controls[controlName].touched && this.issueForm.controls[controlName].hasError(errorName);
  }
}
