import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { departmentMasterModel } from 'src/app/_models/department';

@Component({
  selector: 'app-view-department-master',
  templateUrl: './view-department-master.component.html'
})
export class ViewDepartmentMasterComponent {
  isProceess:boolean= false;
  private _departmentMaster: departmentMasterModel | undefined;
  departmentMasterForm: any;
  set departmentMaster(value: departmentMasterModel) {
    this._departmentMaster = value;
    let updatedBy:any = ' '
    if(this._departmentMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._departmentMaster.updatedBy?.firstName + ' ' + this._departmentMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._departmentMaster) {
      this.departmentMasterForm.patchValue({
        departmentId:this._departmentMaster.departmentId,
        departmentName: this._departmentMaster.departmentName,
        departmentCode:this._departmentMaster.departmentCode,
        departmentHead:this._departmentMaster.departmentHead,
        description:this._departmentMaster.description,
        createdBy:this._departmentMaster.createdBy?.firstName + ' ' + this._departmentMaster.createdBy?.lastName,
        createdDate:moment(this._departmentMaster.createdDate || '').format("llll"),
        updatedDate:moment(this._departmentMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
        status:this._departmentMaster.status ? 'Active' : 'Deactivate',
      });
      this.departmentMasterForm.controls["departmentName"].disable();
      this.departmentMasterForm.controls["departmentCode"].disable();
      this.departmentMasterForm.controls["departmentHead"].disable();
      this.departmentMasterForm.controls["description"].disable();
      this.departmentMasterForm.controls["status"].disable();
      this.departmentMasterForm.controls["departmentId"].disable();
      this.departmentMasterForm.controls["createdBy"].disable();
      this.departmentMasterForm.controls["createdDate"].disable();
      this.departmentMasterForm.controls["updatedDate"].disable();
      this.departmentMasterForm.controls["updatedBy"].disable();

    }
  }

    constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.departmentMasterForm = this.formBuilder.group({
      departmentId:[""],
      createdBy:[""],
      createdDate:[""],
      updatedDate:[""],
      updatedBy:[""],
      departmentName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      departmentCode: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)]],
      departmentHead: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
        description: ['', [Validators.required]],
        status: ['', [Validators.required]]
    });
  }


  onCancel() {
    this.activeModal.close(false);
  }
}
