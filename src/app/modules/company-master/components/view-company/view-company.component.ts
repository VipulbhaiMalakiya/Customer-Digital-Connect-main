import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { companyMasterModel } from 'src/app/_models/company';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html'
})
export class ViewCompanyComponent {
  private _companyMaster: companyMasterModel | undefined;
  isProceess: boolean = false;
  companyMasterForm: any;
  set CompanyMaster(value: companyMasterModel) {
    this._companyMaster = value;
    let updatedBy:any = ' '
    if(this._companyMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._companyMaster.updatedBy?.firstName + ' ' + this._companyMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }

    if (this._companyMaster) {
      this.companyMasterForm.patchValue({
        companyName: this._companyMaster.companyName,
        companyDescription: this._companyMaster.companyDescription,
        apiKey: this._companyMaster.apiKey,
        status:this._companyMaster.status,
        companyId:this._companyMaster.companyId,
        createdDate:moment(this._companyMaster.createdDate || '').format("llll"),
        createdBy:this._companyMaster.createdBy?.firstName + ' ' + this._companyMaster.createdBy?.lastName,
        updatedDate: moment(this._companyMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.cd.detectChanges();
      this.companyMasterForm.controls["companyName"].disable();
      this.companyMasterForm.controls["companyDescription"].disable();
      this.companyMasterForm.controls["status"].disable();
      this.companyMasterForm.controls["apiKey"].disable();
      this.companyMasterForm.controls["companyId"].disable();
      this.companyMasterForm.controls["createdDate"].disable();
      this.companyMasterForm.controls["createdBy"].disable();
      this.companyMasterForm.controls["updatedDate"].disable();
      this.companyMasterForm.controls["updatedBy"].disable();
      // this.isProceess = false;

    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.companyMasterForm = this.formBuilder.group({
      companyName:['', [Validators.required]],
      companyDescription: ['', [Validators.required]],
      apiKey: ['', [Validators.required]],
      status: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
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
