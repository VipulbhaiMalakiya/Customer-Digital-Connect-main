import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-mainmenu',
  templateUrl: './left-mainmenu.component.html',
})
export class LeftMainmenuComponent implements OnInit {
  data: any;
  userData: any;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {
    this.data = localStorage.getItem("userData");
    this.userData = JSON.parse(this.data);

  }
  ngOnInit(): void {}

  get isAdmin() {
    return this.userData?.role?.roleName == 'Admin';
  }

  get isUser() {
    return this.userData?.role?.roleName == 'User';
  }

  get isResolver() {
    return this.userData?.role?.roleName == 'Resolver';
  }

  reloadCurrentPage() {
    // window.location.href = '#/admin/inbox/';
    this.router.navigate(['/admin/inbox/']);
  }

  reloadCurrentPage1() {
    // window.location.href = `/inbox/`;
    this.router.navigate(['/inbox/']);
  }


  refreshworkflow(){
    this.router.navigate(['/admin/workflow']);
    // window.location.href = `/admin/workflow`;
  }

  logout() {
    this.authenticationService.logout();

  }

}
