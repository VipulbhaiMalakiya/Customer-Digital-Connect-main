import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserMaster } from 'src/app/_models';
import { ConfirmedValidator } from 'src/app/shared/directives/confirm-password.validator';
import { PasswordStrengthValidator } from 'src/app/shared/directives/password-strength.validators';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html'
})
export class AddUpdateUserComponent implements OnInit {
  private _userMaster: UserMaster | undefined;
  isProceess: boolean = false;
  userMasterMasterForm: any;
  data: any;
  sdata: any;
  role:any;
  check:any;
  department:any;
  masterName?: any;
  get title(): string {
    return this._userMaster ? "Edit User Master" : " Add User Master";
  }

  set usersMaster(value: UserMaster) {
    this._userMaster = value;
    this.check = value;
    this.role = this._userMaster.role;
    this.department = this._userMaster.department?.departmentId
    if (this._userMaster) {
      this.userMasterMasterForm.patchValue({
        firstName: this._userMaster.firstName,
        lastName: this._userMaster.lastName,
        email: this._userMaster.email,
        contact: this._userMaster.contact,
        state: this._userMaster.state,
        city: this._userMaster.city,
        username: this._userMaster.username,
        status: this._userMaster.status,
        postcode: this._userMaster.postcode,
        address: this._userMaster.address,
        departmentId: this.department,
        roleId: this.role?.roleId
      });
      this.userMasterMasterForm.controls["password"].disable();
      this.userMasterMasterForm.controls["confirmPasswod"].disable();
      this.userMasterMasterForm.controls["username"].disable();
      this.userMasterMasterForm.controls["contact"].disable();
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.userMasterMasterForm = this.formBuilder.group({
      firstName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),]],
      lastName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
       ]],
      email: ['', [
        Validators.required,

        noLeadingSpaceValidator(),

        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]],
      contact: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')]],
      state: ["", [
        Validators.required,

        noLeadingSpaceValidator(),

        ]],
      city: ["", [
        Validators.required,

        noLeadingSpaceValidator(),


      ]],
      roleId: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, PasswordStrengthValidator])],
      confirmPasswod: ['', Validators.required],
      departmentId: ['', [Validators.required]],
      address: ['', [Validators.required,noLeadingSpaceValidator()]],
      username: ['', [Validators.required,noLeadingSpaceValidator()]],
      postcode: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        ]],
      status: [true, [Validators.required]],
    },
      {
        validator: ConfirmedValidator('password', 'confirmPasswod')
      }
    );
  }

  ngOnInit(): void {
    this.getData();
    this.getRole();
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const input = event.key;

    if (!allowedKeys.includes(input) && isNaN(parseInt(input, 10))) {
      event.preventDefault();
    }
  }

  getData() {
    this.masterName ="/department/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }
  getRole(){
    this.masterName ="/role/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.sdata = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.userMasterMasterForm.valid) {
      this.activeModal.close(this.userMasterMasterForm.value)
    } else {

      this.userMasterMasterForm.controls['confirmPasswod'].markAsTouched();
      this.userMasterMasterForm.controls['status'].markAsTouched();
      this.userMasterMasterForm.controls['postcode'].markAsTouched();
      this.userMasterMasterForm.controls['username'].markAsTouched();
      this.userMasterMasterForm.controls['address'].markAsTouched();
      this.userMasterMasterForm.controls['firstName'].markAsTouched();
      this.userMasterMasterForm.controls['lastName'].markAsTouched();
      this.userMasterMasterForm.controls['email'].markAsTouched();
      this.userMasterMasterForm.controls['contact'].markAsTouched();
      this.userMasterMasterForm.controls['state'].markAsTouched();
      this.userMasterMasterForm.controls['city'].markAsTouched();
      this.userMasterMasterForm.controls['roleId'].markAsTouched();
      this.userMasterMasterForm.controls['password'].markAsTouched();
      this.userMasterMasterForm.controls['departmentId'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.userMasterMasterForm.controls[controlName].touched && this.userMasterMasterForm.controls[controlName].hasError(errorName);
  }
}
