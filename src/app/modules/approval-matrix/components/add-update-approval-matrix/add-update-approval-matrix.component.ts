import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprovalMatrixMaster } from 'src/app/_models/master';

@Component({
  selector: 'app-add-update-approval-matrix',
  templateUrl: './add-update-approval-matrix.component.html'
})
export class AddUpdateApprovalMatrixComponent {
  private _approvalMatrixMaster: ApprovalMatrixMaster | undefined;
  isProceess: boolean = true;
  approvalMatrixMasterForm: any;

  get title(): string {
    return this._approvalMatrixMaster ? "Edit Approval Matrix Master" : " Add Approval Matrix Master";
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.approvalMatrixMasterForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!.*?[^aeiou]{5})(?!.*?[aeiou]{3})[a-z]*$/)]],
      Descirption: ['', [Validators.required]],
      ApiKey: ['', [Validators.required]]
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }


  onSubmit() {
    if (this.approvalMatrixMasterForm.valid) {
      console.log(this.approvalMatrixMasterForm.value);

      // this.activeModal.close(this.companyMasterForm.value)
    } else {
      this.approvalMatrixMasterForm.controls['Name'].markAsTouched();
      this.approvalMatrixMasterForm.controls['Descirption'].markAsTouched();
      this.approvalMatrixMasterForm.controls['ApiKey'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.approvalMatrixMasterForm.controls[controlName].touched && this.approvalMatrixMasterForm.controls[controlName].hasError(errorName);
  }
}
