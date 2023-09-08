import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { issueMasterModel } from 'src/app/_models/issue';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-issue',
  templateUrl: './add-edite-issue.component.html',
  styleUrls: ['./add-edite-issue.component.css']
})
export class AddEditeIssueComponent {
  private _issueMaster: issueMasterModel | undefined;
  isProceess: boolean = false;
  data:any;
  issueForm: any;

  get title(): string {
    return this._issueMaster ? "Edit Issue Master" : " Add Issue Master";
  }

  set issuesMaster(value: issueMasterModel) {
    this._issueMaster = value;
    this.data = value;
    if (this._issueMaster) {
      this.issueForm.patchValue({
        issueName: this._issueMaster.issueName,
        calculationSLA:this._issueMaster.calculationSLA,
        status:this._issueMaster.status,
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
      issueName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
        ]],
        calculationSLA:['', [Validators.required]],
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
      this.issueForm.controls['issueName'].markAsTouched();
      this.issueForm.controls['status'].markAsTouched();
      this.issueForm.controls['calculationSLA'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.issueForm.controls[controlName].touched && this.issueForm.controls[controlName].hasError(errorName);
  }
}
