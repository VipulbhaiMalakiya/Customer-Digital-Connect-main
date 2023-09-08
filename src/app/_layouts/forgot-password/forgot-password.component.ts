import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AuthenticationService } from 'src/app/_services';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: any;
  loading = false;
  error = '';
  masterName?: any;
  subscription?: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private titleService: Title,
    private apiService: ApiService
  ) {
    this.titleService.setTitle("CDC - Forgot-Password");
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [
        Validators.required,

        noLeadingSpaceValidator(),

        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.controls['username'].markAsTouched();
      return
    }
    else {
      this.loading = true;
      const formData = new FormData();
      formData.append("email", this.forgotPasswordForm.value.username);
      this.subscription = this.authenticationService.forgotpassword(formData).pipe(take(1)).subscribe(responseData => {
        this.loading = false;
        if (responseData.code === 200) {
          this.toastr.success(responseData.message);
          this.forgotPasswordForm.reset();
          this.router.navigate(['/login']);
        }

      }, error => {
        this.toastr.error(error.error.message);
        this.loading = false;
        // this.forgotPasswordForm.reset();
      });
    }

  }

  shouldShowError(controlName: string, errorName: string) {
    return this.forgotPasswordForm.controls[controlName].touched && this.forgotPasswordForm.controls[controlName].hasError(errorName);
  }
}
