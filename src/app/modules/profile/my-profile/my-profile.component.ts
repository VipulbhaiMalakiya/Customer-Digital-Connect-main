import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { delay, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AuthenticationService } from 'src/app/_services';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';
import { ConfirmationDialogModalComponent } from '../../shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isProceess: boolean = true;
  data: any;
  userData: any;
  userForm: any;
  masterName?: any;
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
  ) {
    this.titleService.setTitle("CDC - My-Profile");
    this.data = localStorage.getItem("userData");
    this.userData = JSON.parse(this.data);
    this.userForm = this.formBuilder.group({
      firstName: [this.userData.firstName, [
        Validators.required,

        noLeadingSpaceValidator(),

      ]],

      lastName: [this.userData.lastName, [
        Validators.required,

        noLeadingSpaceValidator(),


      ]],

      email: [this.userData.email, [
        Validators.required,

        noLeadingSpaceValidator(),

        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]],

      contact: [this.userData.contact, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]],

      state: [this.userData.state, [
        Validators.required,

        noLeadingSpaceValidator(),

      ]],

      city: [this.userData.city, [
        Validators.required,

        noLeadingSpaceValidator(),

      ]],
      username: [this.userData.username, [Validators.required, noLeadingSpaceValidator()]],
      postcode: [this.userData.postcode, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)]],
      roleId: [this.userData?.role?.roleName, Validators.required],
      deptId: [this.userData.department.departmentName, Validators.required],
      address: [this.userData.address, [Validators.required, noLeadingSpaceValidator()]],
    });
    this.userForm.controls["roleId"].disable();
    this.userForm.controls["deptId"].disable()
    this.userForm.controls["username"].disable()
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const input = event.key;

    if (!allowedKeys.includes(input) && isNaN(parseInt(input, 10))) {
      event.preventDefault();
    }
  }

  

  onSubmit() {
    if (this.userForm.valid) {
      var model: any = {
        updatedBy: this.userData.userId,
        status: this.userData.status,
        username: this.userData.username.trim(),
        firstName: this.userForm.value.firstName.trim(),
        lastName: this.userForm.value.lastName.trim(),
        email: this.userForm.value.email.trim(),
        contact: this.userForm.value.contact,
        address: this.userForm.value.address.trim(),
        state: this.userForm.value.state.trim(),
        city: this.userForm.value.city.trim(),
        postcode: this.userForm.value.postcode,
        roleId: this.userData.role?.roleId,
        departmentId: this.userData.department.departmentId,
        userId: this.userData.userId
      };
  
      this.isProceess = true;
      this.masterName = `/users/${this.userData.userId}`;
      let updateData: any = {
        url: this.masterName,
        model: model
      };
  
      this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
        this.toastr.success(res.message);

        const logoutConfirmation = `Are you sure you want to logout?`;
        const isConfirmed = confirm(logoutConfirmation);
  
        if (isConfirmed) {
          this.authenticationService.logout();
        }
  
        this.isProceess = false;
      }, error => {
        this.toastr.error(error.message);
        this.isProceess = false;
      });
    } else {
      this.userForm.controls['postcode'].markAsTouched();
      this.userForm.controls['username'].markAsTouched();
      this.userForm.controls['address'].markAsTouched();
      this.userForm.controls['firstName'].markAsTouched();
      this.userForm.controls['lastName'].markAsTouched();
      this.userForm.controls['email'].markAsTouched();
      this.userForm.controls['contact'].markAsTouched();
      this.userForm.controls['state'].markAsTouched();
      this.userForm.controls['city'].markAsTouched();
      this.userForm.controls['roleId'].markAsTouched();
      this.userForm.controls['departmentId'].markAsTouched();
    }
  }
  



  shouldShowError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].touched && this.userForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.isProceess = false;

  }

}
