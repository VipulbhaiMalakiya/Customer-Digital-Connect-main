import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { UserMaster } from 'src/app/_models';
import { ConfirmedValidator } from 'src/app/shared/directives/confirm-password.validator';
import { PasswordStrengthValidator } from 'src/app/shared/directives/password-strength.validators';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html'
})
export class ViewUserComponent implements OnInit {
  private _userMaster: UserMaster | undefined;
  isProceess: boolean = false;
  userMasterMasterForm: any;
  data: any;
  sdata: any;
  role:any;
  department:any;
  masterName?: any;

  set usersMaster(value: UserMaster) {
    this._userMaster = value;
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
        roleId: this.role.roleId,
        userId:this._userMaster.userId,
        createdBy:this._userMaster.createdBy,
        createdDate:moment(this._userMaster.createdDate || '').format("LLLL"),
        updatedBy:this._userMaster.updatedBy,
        updatedDate:moment(this._userMaster.updatedDate || '').format("LLLL"),
      });
      this.userMasterMasterForm.controls["userId"].disable();
      this.userMasterMasterForm.controls["firstName"].disable();
      this.userMasterMasterForm.controls["lastName"].disable();
      this.userMasterMasterForm.controls["contact"].disable();
      this.userMasterMasterForm.controls["email"].disable();
      this.userMasterMasterForm.controls["city"].disable();
      this.userMasterMasterForm.controls["state"].disable();
      this.userMasterMasterForm.controls["password"].disable();
      this.userMasterMasterForm.controls["confirmPasswod"].disable();
      this.userMasterMasterForm.controls["roleId"].disable();
      this.userMasterMasterForm.controls["departmentId"].disable();
      this.userMasterMasterForm.controls["address"].disable();
      this.userMasterMasterForm.controls["postcode"].disable();
      this.userMasterMasterForm.controls["status"].disable();
      this.userMasterMasterForm.controls["username"].disable();
      this.userMasterMasterForm.controls["createdBy"].disable();
      this.userMasterMasterForm.controls["createdDate"].disable();
      this.userMasterMasterForm.controls["updatedBy"].disable();
      this.userMasterMasterForm.controls["updatedDate"].disable();
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
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      contact: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]],
      state: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      city: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      roleId: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, PasswordStrengthValidator])],
      confirmPasswod: ['', Validators.required],
      departmentId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      username: ['', [Validators.required]],
      postcode: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
        Validators.pattern('^[a-zA-Z0-9]*$')]],
      status: ['', [Validators.required]],
      createdBy:['', [Validators.required]],
      createdDate:['', [Validators.required]],
      updatedBy:['', [Validators.required]],
      updatedDate:['', [Validators.required]],
      userId:[''],
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
  getData() {
    this.masterName ="/department/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data = data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }
  getRole(){
    this.masterName ="/role/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.sdata = data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }
  onCancel() {
    this.activeModal.close(false);
  }
}
