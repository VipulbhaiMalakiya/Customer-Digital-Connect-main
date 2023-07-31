import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
// import { User, Role } from '../../../_models';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // user?: User | null;

  title?: any = ' Dashboard'
  data: any;
  userData: any;

  constructor(private authenticationService: AuthenticationService, private bnIdle: BnNgIdleService) {
    this.data = localStorage.getItem("userData");
    this.userData = JSON.parse(this.data);

  }

  ngOnInit(): void {
    // this.bnIdle.startWatching(1500).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     this.logout();
    //   }
    // });
  }

  get isAdmin() {

    return this.userData?.role?.roleName == 'Admin';
  }

  get isUser(){
    return this.userData?.role?.roleName == 'User';
  }

  get isResolver(){
    return this.userData?.role?.roleName == 'Resolver';
  }

  logout() {
    this.authenticationService.logout();

  }

  ngOnDestroy(): void {
    this.logout();
  }

  classToggled = false;

   toggleField() {
    this.classToggled = !this.classToggled;
    console.log( this.classToggled);

  }

}
