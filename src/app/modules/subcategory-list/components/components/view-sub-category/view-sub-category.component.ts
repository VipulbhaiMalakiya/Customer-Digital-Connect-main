import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { CategoryMasterModel } from 'src/app/_models/category';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
@Component({
  selector: 'app-view-sub-category',
  templateUrl: './view-sub-category.component.html',
  styleUrls: ['./view-sub-category.component.css']
})
export class ViewSubCategoryComponent {
  private _subCategoryMaster: subCategoryMasterModel | undefined;
  isProceess: boolean = true;
  subCategoryMasterForm: any;
  masterName?: any;
  data: CategoryMasterModel[] = [];
  set subCategoryMaster(value: subCategoryMasterModel) {
    this._subCategoryMaster = value;
    let updatedBy:any = ' '
    if(this._subCategoryMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._subCategoryMaster.updatedBy?.firstName + ' ' + this._subCategoryMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._subCategoryMaster) {
      this.subCategoryMasterForm.patchValue({
        subCategoryName:this._subCategoryMaster.subCategoryName,
        status:this._subCategoryMaster.status,
        categoryId:this._subCategoryMaster.category?.categoryId,
        subCategoryId:this._subCategoryMaster.subCategoryId,
        createdDate:moment(this._subCategoryMaster.createdDate || '').format("llll"),
        createdBy:this._subCategoryMaster.createdBy?.firstName + ' ' + this._subCategoryMaster.createdBy?.lastName,
        updatedBy:updatedBy,
        updatedDate:moment(this._subCategoryMaster.updatedDate || '').format("llll"),
      });
      this.subCategoryMasterForm.controls["subCategoryName"].disable();
      this.subCategoryMasterForm.controls["status"].disable();
      this.subCategoryMasterForm.controls["categoryId"].disable();
      this.subCategoryMasterForm.controls["subCategoryId"].disable();
      this.subCategoryMasterForm.controls["createdDate"].disable();
      this.subCategoryMasterForm.controls["updatedBy"].disable();
      this.subCategoryMasterForm.controls["updatedDate"].disable();
      this.subCategoryMasterForm.controls["createdBy"].disable();
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
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      status: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      subCategoryId:['', [Validators.required]],
      createdDate:['', [Validators.required]],
      createdBy:['', [Validators.required]],
      updatedBy:['', [Validators.required]],
      updatedDate:['', [Validators.required]]
    });
  }
  onCancel() {
    this.activeModal.close(false);
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
}
