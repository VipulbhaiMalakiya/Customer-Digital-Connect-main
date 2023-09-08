import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryMasterModel } from 'src/app/_models/category';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-sub-category',
  templateUrl: './add-edite-sub-category.component.html',
  styleUrls: ['./add-edite-sub-category.component.css']
})
export class AddEditeSubCategoryComponent implements OnInit {
  private _subCategoryMaster: subCategoryMasterModel | undefined;
  isProceess: boolean = true;
  subCategoryMasterForm: any;
  data: CategoryMasterModel[] = [];
  masterName?: any;
  check:any;
  get title(): string {
    return this._subCategoryMaster ? "Edit Sub Category Master" : " Add Sub Category Master";
  }
  set subCategoryMaster(value: subCategoryMasterModel) {
    this._subCategoryMaster = value;
    this.check = value;
    if (this._subCategoryMaster) {
      this.subCategoryMasterForm.patchValue({
        subCategoryName:this._subCategoryMaster.subCategoryName,
        status:this._subCategoryMaster.status,
        categoryId:this._subCategoryMaster.category?.categoryId,
      });
      // this.subCategoryMasterForm.controls["categoryId"].disable();
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.subCategoryMasterForm = this.formBuilder.group({
      subCategoryName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
       ]],
      status: [true, [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.masterName ="/category/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    })
  }
  onCancel() {
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.subCategoryMasterForm.valid) {
      this.activeModal.close(this.subCategoryMasterForm.value)
    } else {
      this.subCategoryMasterForm.controls['subCategoryName'].markAsTouched();
      this.subCategoryMasterForm.controls['status'].markAsTouched();
      this.subCategoryMasterForm.controls['categoryId'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.subCategoryMasterForm.controls[controlName].touched && this.subCategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
