import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AuthenticationService } from 'src/app/_services';
import { ConfirmedValidator } from 'src/app/shared/directives/confirm-password.validator';
import { PasswordStrengthValidator } from 'src/app/shared/directives/password-strength.validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  userMasterMasterForm: any;
  loading: boolean = false;
  public showPassword: boolean = false;
  public showPassword1: boolean = false;
  errorMessage?: any;
  successMessage?: any;
  resetToken: any;
  CurrentState: any;

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle("CDC - Reset Password");
    this.route.params.subscribe(() => {
      this.resetToken = this.route.snapshot.paramMap.get('token');
    });

    this.userMasterMasterForm = this.formBuilder.group({

      password: ['', Validators.compose([Validators.required, PasswordStrengthValidator])],
      confirmPasswod: ['', Validators.required],
    },
      {
        validator: ConfirmedValidator('password', 'confirmPasswod')
      }
    );
  }


  toggleFieldTextType() {
    this.showPassword = !this.showPassword;
  }

  toggleFieldTextType1() {
    this.showPassword1 = !this.showPassword1;
  }
  onSubmit() {
    this.loading = true;
    if (this.userMasterMasterForm.valid) {
      let data: any = {
        password: this.userMasterMasterForm.value.password,
        token: this.resetToken
      }
      this.authenticationService.newPassword(data).subscribe(
        data => {
          if (data.code === 200) {
            this.toastr.success(data.message);
            this.loading = false;
            this.router.navigate(['login']);
            this.userMasterMasterForm.reset();
          }
        },
        err => {
          if (err.error.message) {
            this.loading = false;
            this.toastr.error(err.error.message);
            this.router.navigate(['login']);
          }
        }
      );
    }
    else {
      this.loading = false;
      this.userMasterMasterForm.controls['confirmPasswod'].markAsTouched();
      this.userMasterMasterForm.controls['password'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.userMasterMasterForm.controls[controlName].touched && this.userMasterMasterForm.controls[controlName].hasError(errorName);
  }

}
