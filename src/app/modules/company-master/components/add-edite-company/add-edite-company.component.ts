import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { companyMasterModel } from 'src/app/_models/company';
import { CompanyMaster } from 'src/app/_models/master';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-company',
  templateUrl: './add-edite-company.component.html',
})
export class AddEditeCompanyComponent {
  private _companyMaster: companyMasterModel | undefined;
  isProceess: boolean = false;
  companyMasterForm: any;
  data:any;

  get title(): string {
    return this._companyMaster ? "Edit Company Master" : " Add Company Master";
  }

  set CompanyMaster(value: companyMasterModel) {
    this._companyMaster = value;
    this.data = value;
    this.isProceess = true;
    if (this._companyMaster) {
      this.companyMasterForm.patchValue({
        companyName: this._companyMaster.companyName,
        companyDescription: this._companyMaster.companyDescription,
        apiKey: this._companyMaster.apiKey,
        status: this._companyMaster.status,
      });
      this.isProceess = false;
      this.cd.detectChanges();
      this.companyMasterForm.controls["apiKey"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.companyMasterForm = this.formBuilder.group({
      companyName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
        ]],
      companyDescription: ['', [Validators.required, noLeadingSpaceValidator()]],
      apiKey: ['', [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }


  onSubmit() {
    if (this.companyMasterForm.valid) {
      this.activeModal.close(this.companyMasterForm.value)
    } else {
      this.companyMasterForm.controls['companyName'].markAsTouched();
      this.companyMasterForm.controls['companyDescription'].markAsTouched();
      this.companyMasterForm.controls['status'].markAsTouched();
      this.companyMasterForm.controls['apiKey'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.companyMasterForm.controls[controlName].touched && this.companyMasterForm.controls[controlName].hasError(errorName);
  }
}
