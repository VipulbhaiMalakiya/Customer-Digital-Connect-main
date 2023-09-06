import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customers } from 'src/app/_models/customer';
import { noEmptySpaces } from 'src/app/shared/directives/noEmptySpaces.validator';

@Component({
  selector: 'app-add-update-customers',
  templateUrl: './add-update-customers.component.html'
})
export class AddUpdateCustomersComponent {
  private _customersMaster: Customers | undefined;
  isProceess: boolean = false;
  customersMasterForm: any;
  data: any;

  get title(): string {
    return this._customersMaster ? "Edit Customer Master" : " Add Customer Master";
  }

  set customersMaster(value: Customers) {
    this._customersMaster = value;
    this.data = value;
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
        status: this._customersMaster.status,

      });
      this.customersMasterForm.controls["contact"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.customersMasterForm = this.formBuilder.group({
      firstName: ["", [
        Validators.required,
        noEmptySpaces,
        ]],
      lastName: ["", [
        Validators.required,noEmptySpaces,]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]],
      contact: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')]],
      postcode: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        ]],
      city: ["", [
        Validators.required,
        noEmptySpaces,
        ]],
      state: ["", [
        Validators.required,
        noEmptySpaces

        ]],
      address: ['', [Validators.required,noEmptySpaces]],
      status: [true, [Validators.required]]
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const input = event.key;

    if (!allowedKeys.includes(input) && isNaN(parseInt(input, 10))) {
      event.preventDefault();
    }
  }
  onSubmit() {
    if (this.customersMasterForm.valid) {
      this.activeModal.close(this.customersMasterForm.value)
    } else {
      this.customersMasterForm.controls['firstName'].markAsTouched();
      this.customersMasterForm.controls['lastName'].markAsTouched();
      this.customersMasterForm.controls['email'].markAsTouched();
      this.customersMasterForm.controls['contact'].markAsTouched();
      this.customersMasterForm.controls['postcode'].markAsTouched();
      this.customersMasterForm.controls['city'].markAsTouched();
      this.customersMasterForm.controls['state'].markAsTouched();
      this.customersMasterForm.controls['address'].markAsTouched();
      this.customersMasterForm.controls['status'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
