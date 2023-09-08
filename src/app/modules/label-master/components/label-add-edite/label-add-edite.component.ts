import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { issueMasterModel } from 'src/app/_models/issue';
import { labelMasterModel } from 'src/app/_models/labels';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-label-add-edite',
  templateUrl: './label-add-edite.component.html',
  styleUrls: ['./label-add-edite.component.css']
})
export class LabelAddEditeComponent {
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
    if (this._labelsMaster) {
      this.issueForm.patchValue({
        labelName: this._labelsMaster.labelName,
        status:this._labelsMaster.status,
      });
      // this.issueForm.controls["departmentCode"].disable();
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

        noLeadingSpaceValidator(),
        ]],
        status:[true, [Validators.required]]
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
