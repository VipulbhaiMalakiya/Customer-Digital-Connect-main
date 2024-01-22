import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { Router } from '@angular/router';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-left-mainmenu',
  templateUrl: './left-mainmenu.component.html',
})
export class LeftMainmenuComponent implements OnInit {
  data: any;
  userData: any;


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,) {
    this.data = localStorage.getItem("userData");
    this.userData = JSON.parse(this.data);

  }
  ngOnInit(): void {
  }


  get isAuditor(){
    return this.userData?.department?.departmentName == 'Zenoti' || this.userData?.department?.departmentName == 'Admin';
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

  get isApprover() {
    return this.userData?.role?.roleName == 'Approver';
  }

  reloadCurrentPage() {
    this.router.navigate(['/admin/inbox/']);
  }

  reloadCurrentPage1() {
    this.router.navigate(['/inbox/']);
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

}
