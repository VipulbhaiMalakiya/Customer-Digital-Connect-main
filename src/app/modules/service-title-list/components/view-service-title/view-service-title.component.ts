import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CategoryMasterModel } from 'src/app/_models/category';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';

@Component({
  selector: 'app-view-service-title',
  templateUrl: './view-service-title.component.html',
  styleUrls: ['./view-service-title.component.css']
})

  export class ViewServiceTitleComponent {
  private _serviceTitleMaster: servicetitleMasterModel | undefined;
  isProceess: boolean = false;
  serviceTitleMasterForm: any;
  data: CategoryMasterModel[] = [];
  sdata: subCategoryMasterModel[] = [];
  set serviceTitleMaster(value: subCategoryMasterModel) {
    this._serviceTitleMaster = value;
    let updatedBy:any = ' '
    if(this._serviceTitleMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._serviceTitleMaster.updatedBy?.firstName + ' ' + this._serviceTitleMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._serviceTitleMaster) {
      this.serviceTitleMasterForm.patchValue({
        category: this._serviceTitleMaster.subCategory?.category?.categoryName,
        status: this._serviceTitleMaster.status ? 'Active' : 'Deactivate',
        defaultPriority: this._serviceTitleMaster.defaultPriority?.priorityName,
        subCategoryId: this._serviceTitleMaster.subCategory?.subCategoryName,
        serviceName: this._serviceTitleMaster.serviceName,
        serviceId: this._serviceTitleMaster.serviceId,
        createdDate: moment(this._serviceTitleMaster.createdDate || '').format("llll"),
        createdBy: this._serviceTitleMaster.createdBy?.firstName + ' ' + this._serviceTitleMaster.createdBy?.lastName,
        updatedDate: moment(this._serviceTitleMaster.updatedDate || '').format("llll"),
        updatedBy: updatedBy,
      });
      this.serviceTitleMasterForm.controls["serviceName"].disable();
      this.serviceTitleMasterForm.controls["serviceId"].disable();
      this.serviceTitleMasterForm.controls["subCategoryId"].disable();
      this.serviceTitleMasterForm.controls["category"].disable();
      this.serviceTitleMasterForm.controls["defaultPriority"].disable();
      this.serviceTitleMasterForm.controls["status"].disable();
      this.serviceTitleMasterForm.controls["createdDate"].disable();
      this.serviceTitleMasterForm.controls["createdBy"].disable();
      this.serviceTitleMasterForm.controls["updatedDate"].disable();
      this.serviceTitleMasterForm.controls["updatedBy"].disable();
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {
    this.serviceTitleMasterForm = this.formBuilder.group({
      updatedDate: ['', [Validators.required]],
      updatedBy: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
      category: ['', [Validators.required]],
      serviceId: ['', [Validators.required]],
      status: ['', [Validators.required]],
      defaultPriority: ['', [Validators.required]],
      subCategoryId: ['', [Validators.required]],
      serviceName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
