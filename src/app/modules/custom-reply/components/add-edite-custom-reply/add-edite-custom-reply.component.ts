import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { customReplyMaster } from 'src/app/_models/custom-reply';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-custom-reply',
  templateUrl: './add-edite-custom-reply.component.html',
  styleUrls: ['./add-edite-custom-reply.component.css']
})
export class AddEditeCustomReplyComponent {
  private _categoryMaster: customReplyMaster | undefined;
  isProceess: boolean = false;
  data:any;
  dataArray: any[] = [];
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
        Inputvariation1:this._categoryMaster.inputVariations[0],
        Inputvariation2:this._categoryMaster.inputVariations[1],
        Inputvariation3:this._categoryMaster.inputVariations[2],
        Inputvariation4:this._categoryMaster.inputVariations[3],
        Inputvariation5:this._categoryMaster.inputVariations[4],
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
        noLeadingSpaceValidator()]],
        Inputvariation1:[''],
        Inputvariation2:[''],
        Inputvariation3:[''],
        Inputvariation4:[''],
        Inputvariation5:[''],
        messageBody: ['', [Validators.required, noLeadingSpaceValidator()]],
    });
  }


  onCancel() {
    this.isProceess = false;
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.CategoryMasterForm.valid) {

      const newData = [
        this.CategoryMasterForm.value.Inputvariation1,
        this.CategoryMasterForm.value.Inputvariation2,
        this.CategoryMasterForm.value.Inputvariation3,
        this.CategoryMasterForm.value.Inputvariation4,
        this.CategoryMasterForm.value.Inputvariation5,
      ];
        this.dataArray.push(newData);

        this.dataArray = [].concat(...this.dataArray);

      let data:any = {
        input : this.CategoryMasterForm.value.input,
        messageBody:this.CategoryMasterForm.value.messageBody,
        inputVariations:this.dataArray
      }
      this.activeModal.close(data)
    } else {
      this.CategoryMasterForm.controls['input'].markAsTouched();
      this.CategoryMasterForm.controls['messageBody'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.CategoryMasterForm.controls[controlName].touched && this.CategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
