import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { customReplyMaster } from 'src/app/_models/custom-reply';
import { noEmptySpaces } from 'src/app/shared/directives/noEmptySpaces.validator';
import { capitalLetterValidator } from 'src/app/shared/directives/startsWithCapital';

@Component({
  selector: 'app-add-edite-custom-reply',
  templateUrl: './add-edite-custom-reply.component.html',
  styleUrls: ['./add-edite-custom-reply.component.css']
})
export class AddEditeCustomReplyComponent {
  private _categoryMaster: customReplyMaster | undefined;
  isProceess: boolean = false;
  data:any;
  CategoryMasterForm: any;
  get title(): string {
    return this._categoryMaster ? "Edit Custom Auto Reply" : " Add Custom Auto Reply";
  }
  set categoryMaster(value: customReplyMaster) {
    this.data = value;
    this.isProceess =true;
    this._categoryMaster = value;
    if (this._categoryMaster) {
      this.CategoryMasterForm.patchValue({
        input:this._categoryMaster.input,
        messageBody:this._categoryMaster.messageBody,
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
      input: ["", [
        Validators.required,
        Validators.minLength(2),
        capitalLetterValidator(),
        Validators.maxLength(30),
        noEmptySpaces,
        Validators.pattern('^(?!\\s*$)[a-zA-Z\\s]*$')]],
        messageBody: [true, [Validators.required]],
        inputVariations:['']
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
      this.CategoryMasterForm.controls['input'].markAsTouched();
      this.CategoryMasterForm.controls['messageBody'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.CategoryMasterForm.controls[controlName].touched && this.CategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
