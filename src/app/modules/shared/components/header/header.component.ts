import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationService } from 'src/app/_services';
import { ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ConfirmationDialogModalComponent } from '../confirmation-dialog-modal/confirmation-dialog-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  messages: { text: string; time: any; icone:any; read: boolean }[] = [
    {
      text: 'You have 1 campaigns at the moment',
      time: 'JUST NOW',
      icone:'las la-check',
      read: true,
    },
    {
      text: 'Vipul has assigned new task to you',
      time: '10 HOURS',
      icone:'las la-file-alt',
      read: true,
    },
    {
      text: 'Your Order will be delivered today',
      time: 'YESTERDAY',
      icone:'las la-thumbs-up',
      read: true,
    },
    {
      text: 'You have 1 campaigns at the moment',
      time: '11/07/2023',
      icone:'las la-check',
      read: true,
    },
    {
      text: 'You have 1 campaigns at the moment',
      time: '5/07/2023',
      icone:'las la-check',
      read: true,
    },
    // Add more messages here
  ];

  unreadCount: number = this.messages.filter(message => !message.read).length;

  markAsRead(message: { text: string, read: boolean }) {
    message.read = true;
    this.unreadCount = this.messages.filter(m => !m.read).length;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private modalService: NgbModal
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
    const isClickInsideNotification = this.elRef.nativeElement.contains(
      event.target
    );

    if (!isClickInsideDropdown && !isClickInsideNotification) {
      this.closeDropdownAndNotification();
    }
  }
  closeDropdownAndNotification() {
    this.renderer.removeClass(
      this.elRef.nativeElement.querySelector('.top-user-profile'),
      'toggled'
    );
    this.renderer.removeClass(
      this.elRef.nativeElement.querySelector('.notification-bar'),
      'toggled'
    );
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

    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });

    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = 'Are you sure you want to logout?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.authenticationService.logout();
        }
      })
      .catch(() => { });
  }

  toggleField() {
    this.isprofile = false;
    // this.closeDropdownAndNotification();
    this.classToggled = !this.classToggled;
  }

  profile() {
    // this.closeDropdownAndNotification();

    this.classToggled = false;
    this.isprofile = !this.isprofile;
  }
}
