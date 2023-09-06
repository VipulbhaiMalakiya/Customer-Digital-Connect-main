import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationService } from 'src/app/_services';
import { ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // user?: User | null;

  title?: any = ' Dashboard';
  data: any;
  userData: any;
  classToggled = false;
  isprofile = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.data = localStorage.getItem('userData');
    this.userData = JSON.parse(this.data);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Close the fields when navigating to another page
        this.classToggled = false;
        this.isprofile = false;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const isClickInsideDropdown = this.elRef.nativeElement
      .querySelector('.top-user-profile')
      .contains(event.target);
    const isClickInsideNotification = this.elRef.nativeElement
      .contains(event.target);

    if (!isClickInsideDropdown && !isClickInsideNotification) {
      this.closeDropdownAndNotification();
    }
  }
  closeDropdownAndNotification() {
    this.renderer.removeClass(this.elRef.nativeElement.querySelector('.top-user-profile'), 'toggled');
    // this.renderer.removeClass(this.elRef.nativeElement.querySelector('.notification-bar'), 'toggled');
    this.isprofile = false;
    this.classToggled = false;
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

  get isUser() {
    return this.userData?.role?.roleName == 'User';
  }

  get isResolver() {
    return this.userData?.role?.roleName == 'Resolver';
  }

  logout() {
    this.authenticationService.logout();
  }

  toggleField() {
    this.closeDropdownAndNotification();

    this.isprofile = false;
    this.classToggled = !this.classToggled;
  }

  profile() {
    this.closeDropdownAndNotification();

    this.classToggled = false;
    this.isprofile = !this.isprofile;
  }
}
