import { Component, OnDestroy, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
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



  classToggled = false;
  isprofile = false;
   toggleField() {
    this.isprofile = false;
    this.classToggled = !this.classToggled;

  }

  profile(){
    this.classToggled = false;
    this.isprofile = !this.isprofile;

  }

}

