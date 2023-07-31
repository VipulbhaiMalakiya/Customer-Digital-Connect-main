import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CategoryMasterModel } from 'src/app/_models/category';
@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent {
  private _categoryMaster: CategoryMasterModel | undefined;
  isProceess: boolean = true;
  CategoryMasterForm: any;
  get title(): string {
    return this._categoryMaster ? "Edit Category Master" : " Add Category Master";
  }
  set categoryMaster(value: CategoryMasterModel) {
    this._categoryMaster = value;
    let updatedBy:any = ' '
    if(this._categoryMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._categoryMaster.updatedBy?.firstName + ' ' + this._categoryMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._categoryMaster) {
      this.CategoryMasterForm.patchValue({
        categoryName:this._categoryMaster.categoryName,
        status:this._categoryMaster.status ? 'Active' : 'Deactivate',
        categoryId:this._categoryMaster.categoryId,
        createdDate:moment(this._categoryMaster.createdDate || '').format("llll"),
        createdBy:this._categoryMaster.createdBy?.firstName + ' ' + this._categoryMaster.createdBy?.lastName,
        updatedDate: moment(this._categoryMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.CategoryMasterForm.controls["categoryName"].disable();
      this.CategoryMasterForm.controls["status"].disable();
      this.CategoryMasterForm.controls["categoryId"].disable();
      this.CategoryMasterForm.controls["createdDate"].disable();
      this.CategoryMasterForm.controls["createdBy"].disable();
      this.CategoryMasterForm.controls["updatedDate"].disable();
      this.CategoryMasterForm.controls["updatedBy"].disable();
      this.isProceess = false;
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder  ) {
    this.CategoryMasterForm = this.formBuilder.group({
      categoryName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
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
}
