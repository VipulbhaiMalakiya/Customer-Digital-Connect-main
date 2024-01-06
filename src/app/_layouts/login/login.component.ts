import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../_services/index';
import { Title } from '@angular/platform-browser';
import { EncrDecrService } from 'src/app/_services/encr-decr.service';
import jwt_decode from 'jwt-decode';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loading = false;
  error = '';
  logUser: any;
  loginForm: any;
  logUsers: any;
  public showPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private titleService: Title,
    private EncrDecr: EncrDecrService
  ) {
    this.titleService.setTitle('CDC - Login');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // rememberMe: [false, Validators.requiredTrue],
    });
  }
  toggleFieldTextType() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {
    const d: any = localStorage.getItem('userData');
    this.logUsers = JSON.parse(d);
    if (this.logUsers) {
      if (this.logUsers.role?.roleName == 'Admin') {
        this.router.navigate(['/admin/inbox']);
      } else if (this.logUsers.role?.roleName == 'User') {
        this.router.navigate(['/inbox']);
      } else if (this.logUsers.role?.roleName == 'Resolver') {
        this.router.navigate(['/inbox']);
      }
      else if (this.logUsers.role?.roleName == 'Approver') {
        this.router.navigate(['/assigned-ticket-list']);
        this.toastr.success('You are successfully logged in!');
      }
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
      // this.loginForm.controls['rememberMe'].markAsTouched();
      return;
    }
    this.loading = true;
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authenticationService.loginUser(data).subscribe(
      (userdata: any) => {
        {
          localStorage.setItem('Token', userdata.token);
          var decoded: any = jwt_decode(userdata.token);
          this.authenticationService.loginDetail(decoded.sub).then(
            (userInfo: any) => {
              localStorage.setItem('userData', JSON.stringify(userInfo));
              let role = userInfo.role?.roleName;
              this.loading = false;
              if (role == 'Admin') {
                this.router.navigate(['/admin/inbox']);
                this.toastr.success('You are successfully logged in!');
              } else if (role == 'User') {
                this.router.navigate(['/inbox']);
                this.toastr.success('You are successfully logged in!');
              } else if (role == 'Resolver') {
                this.router.navigate(['/inbox']);
                this.toastr.success('You are successfully logged in!');
              }
              else if (role == 'Approver') {
                this.router.navigate(['/assigned-ticket-list']);
                this.toastr.success('You are successfully logged in!');
              }
              else {
                this.router.navigate(['/login']);
              }
              // this.toastr.success("You are successfully logged in!!");
            },
            (error: any) => {
              this.loading = false;
              if (error.status === 0 && error.statusText === 'Unknown Error') {
                // CORS error occurred
                this.toastr.error('CORS error occurred. API not accessible.');
                // Stop loading or handle the error state in your application
              } else {
                // Handle other errors
                this.toastr.error(error);
              }
            }
          );
        }
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error('Username and Password not accepted!');
      }
    );
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.loginForm.controls[controlName].touched &&
      this.loginForm.controls[controlName].hasError(errorName)
    );
  }
}
