import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from 'src/app/shared/directives/confirm-password.validator';
import { PasswordStrengthValidator } from 'src/app/shared/directives/password-strength.validators';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  loading = false;
  error = '';
  signupForm: any;
  public showPassword: boolean = false;
  public confirmshowPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private titleService: Title,
  ) {

    this.titleService.setTitle("Avataara - Sign-Up");
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }

    this.signupForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!.*?[^aeiou]{5})(?!.*?[aeiou]{3})[a-z]*$/)]],
      lastename: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, PasswordStrengthValidator])],
      confirmPasswod: ['', Validators.required]
    },
      {
        validator: ConfirmedValidator('password', 'confirmPasswod')
      }
    )
  }

  confirmFieldTextType() {
    this.confirmshowPassword = !this.confirmshowPassword;
  }
  toggleFieldTextType() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.controls['firstname'].markAsTouched();
      this.signupForm.controls['lastename'].markAsTouched();
      this.signupForm.controls['email'].markAsTouched();
      this.signupForm.controls['password'].markAsTouched();
      this.signupForm.controls['confirmPasswod'].markAsTouched();
      return
    }
    this.loading = true;

    // this.authenticationService.login(this.signupForm.value)

    //   .subscribe({
    //     next: () => {
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigate([returnUrl]);;
    //       this.toastr.success("You are successfully logged in!");
    //     },
    //     error: error => {
    //       this.error = error;
    //       this.loading = false;
    //       this.toastr.error(this.error);
    //     }
    //   });
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.signupForm.controls[controlName].touched && this.signupForm.controls[controlName].hasError(errorName);
  }

}
