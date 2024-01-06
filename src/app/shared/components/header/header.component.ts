import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
// import { User, Role } from '../../../_models';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // user?: User | null;

  title?: any = ' Dashboard'
  data: any;
  userData: any;


  constructor(private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private bnIdle: BnNgIdleService) {
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

  ngOnDestroy(): void {
    this.logout();
  }

  classToggled = false;

  toggleField() {
    this.classToggled = !this.classToggled;
    console.log(this.classToggled);

  }

}
