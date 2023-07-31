import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Customers } from 'src/app/_models/customer';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html'
})
export class ViewCustomersComponent {
  private _customersMaster: Customers | undefined;
  isProceess: boolean = false;
  customersMasterForm: any;

  set customersMaster(value: Customers) {
    this._customersMaster = value;
    let updatedBy:any = ' '
    if(this._customersMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._customersMaster.updatedBy?.firstName + ' ' + this._customersMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._customersMaster) {
      this.customersMasterForm.patchValue({
        firstName: this._customersMaster.firstName,
        lastName: this._customersMaster.lastName,
        email: this._customersMaster.email,
        contact: this._customersMaster.contact,
        postcode: this._customersMaster.postcode,
        city: this._customersMaster.city,
        state: this._customersMaster.state,
        address: this._customersMaster.address,
        customerId:this._customersMaster.customerId,
        createdBy:this._customersMaster.createdBy?.firstName + ' ' + this._customersMaster.createdBy?.lastName,
        createdDate:moment(this._customersMaster.createdDate || '').format("LLLL"),
        updatedBy:updatedBy,
        updatedDate:moment(this._customersMaster.updatedDate || '').format("LLLL"),
        status:this._customersMaster.status ? 'Active' : 'Deactivate',

      });
      this.customersMasterForm.controls["firstName"].disable();
      this.customersMasterForm.controls["lastName"].disable();
      this.customersMasterForm.controls["email"].disable();
      this.customersMasterForm.controls["contact"].disable();
      this.customersMasterForm.controls["postcode"].disable();
      this.customersMasterForm.controls["city"].disable();
      this.customersMasterForm.controls["state"].disable();
      this.customersMasterForm.controls["address"].disable();
      this.customersMasterForm.controls["customerId"].disable();
      this.customersMasterForm.controls["createdBy"].disable();
      this.customersMasterForm.controls["createdDate"].disable();
      this.customersMasterForm.controls["updatedBy"].disable();
      this.customersMasterForm.controls["updatedDate"].disable();
      this.customersMasterForm.controls["status"].disable();
    }
  }

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    ) {

    this.customersMasterForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!.*?[^aeiou]{5})(?!.*?[aeiou]{3})[a-z]*$/)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!.*?[^aeiou]{5})(?!.*?[aeiou]{3})[a-z]*$/)]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      postcode:['', [Validators.required]],
      city:['', [Validators.required]],
      state:['', [Validators.required]],
      address:['', [Validators.required]],
      customerId:['', [Validators.required]],
      createdBy:['', [Validators.required]],
      createdDate:['', [Validators.required]],
      updatedBy:['', [Validators.required]],
      updatedDate:['', [Validators.required]],
      status:['', [Validators.required]],
    });
  }



  onCancel() {
    this.activeModal.close(false);
  }
}
