import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { departmentMasterModel } from 'src/app/_models/department';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';


@Component({
  selector: 'app-add-edite-department-master',
  templateUrl: './add-edite-department-master.component.html',
})
export class AddEditeDepartmentMasterComponent {
  private _departmentMaster: departmentMasterModel | undefined;
  isProceess: boolean = false;
  data: any;
  departmentMasterForm: any;

  get title(): string {
    return this._departmentMaster
      ? 'Edit Department Master'
      : ' Add Department Master';
  }

  set departmentMaster(value: departmentMasterModel) {
    this._departmentMaster = value;
    this.data = value;
    if (this._departmentMaster) {
      this.departmentMasterForm.patchValue({
        departmentName: this._departmentMaster.departmentName,
        departmentCode: this._departmentMaster.departmentCode,
        departmentHead: this._departmentMaster.departmentHead,
        description: this._departmentMaster.description,
        status: this._departmentMaster.status,
      });
      this.departmentMasterForm.controls['departmentCode'].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.departmentMasterForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, noLeadingSpaceValidator()]],
      departmentCode: ['', [Validators.required, noLeadingSpaceValidator()]],
      departmentHead: ['', [Validators.required, noLeadingSpaceValidator()]],
      description: ['', [Validators.required, noLeadingSpaceValidator()]],
      status: [true, [Validators.required]],
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.departmentMasterForm.valid) {
      this.activeModal.close(this.departmentMasterForm.value);
    } else {
      this.departmentMasterForm.controls['departmentName'].markAsTouched();
      this.departmentMasterForm.controls['departmentCode'].markAsTouched();
      this.departmentMasterForm.controls['departmentHead'].markAsTouched();
      this.departmentMasterForm.controls['description'].markAsTouched();
      this.departmentMasterForm.controls['status'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.departmentMasterForm.controls[controlName].touched &&
      this.departmentMasterForm.controls[controlName].hasError(errorName)
    );
  }
}
