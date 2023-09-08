import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryMasterModel } from 'src/app/_models/category';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';
import { noBlankSpacesValidator } from 'src/app/shared/directives/noWhitespace.validator';
@Component({
  selector: 'app-add-edite-category',
  templateUrl: './add-edite-category.component.html',
  styleUrls: ['./add-edite-category.component.css']
})
export class AddEditeCategoryComponent {
  private _categoryMaster: CategoryMasterModel | undefined;
  isProceess: boolean = false;
  data:any;
  CategoryMasterForm: any;
  get title(): string {
    return this._categoryMaster ? "Edit Category Master" : " Add Category Master";
  }
  set categoryMaster(value: CategoryMasterModel) {
    this.data = value;
    this.isProceess =true;
    this._categoryMaster = value;
    if (this._categoryMaster) {
      this.CategoryMasterForm.patchValue({
        categoryName:this._categoryMaster.categoryName,
        status:this._categoryMaster.status,
      });
      // this.rolesPermissionsMasterForm.controls["email"].disable();
      this.isProceess = false;
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.CategoryMasterForm = this.formBuilder.group({
      categoryName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
      ]],
        status: [true, [Validators.required]],
    });
  }


  onCancel() {
    this.isProceess = false;
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.CategoryMasterForm.valid) {
      this.activeModal.close(this.CategoryMasterForm.value)
    } else {
      this.CategoryMasterForm.controls['categoryName'].markAsTouched();
      this.CategoryMasterForm.controls['status'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.CategoryMasterForm.controls[controlName].touched && this.CategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
