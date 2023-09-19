import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { CustomersService } from 'src/app/_api/masters/customers.service';
import { ExcelService } from 'src/app/_services/excel.service';
import { AddUpdateCustomersComponent } from '../../components/add-update-customers/add-update-customers.component';
import { ViewCustomersComponent } from '../../components/view-customers/view-customers.component';
import { Customers, CustomersMasterModel, UpdateCustomersMasterModel, DeleteCustomersMasterModel } from 'src/app/_models/customer';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ChatComponent } from 'src/app/modules/chat/pages/chat/chat.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit, OnDestroy {

  isProceess: boolean = true;
  term: any;
  data: Customers[] = [];
  subscription?: Subscription;
  userData: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  masterName?: any;
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    public CSAPI: CustomersService,
    private appService: AppService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.titleService.setTitle("CDC - Customers List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/customer";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data;
        this.count = this.data.length;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    }, error => {
      this.isProceess = false;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy: any = ' ';
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else {
        updatedBy = ''
      }
      return {
        "Customer Id": x.customerId || '',
        "First Name": x.firstName || '',
        "Last Name": x.lastName || '',
        "Email": x.email || '',
        "Contact": x.contact || '',
        "Address": x.address || '',
        "State": x.state || '',
        "City": x.city || '',
        "Status": x.status ? 'Active' : 'Deactivate',
        "Post Code": x.postcode || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll")
      }
    });
    const headers = ["Customer Id", "First Name", "Last Name", "Email", "Contact",
      "Address", "State", "City", "Status", "Post Code", "Created By", "Created Date",
      "Updated By", "Updated Date"
    ];
    this.appService.exportAsExcelFile(exportData, "Customers-Master", headers);
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateCustomersComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result.then((data: Customers) => {
      if (data) {
        var model: CustomersMasterModel = {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          contact: `91${data.contact}`,
          address: data.address.trim(),
          state: data.state.trim(),
          city: data.city.trim(),
          createdBy: this.userData.userId,
          postcode: data.postcode,
          status: data.status
        }
        this.masterName = `/customer`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1)).subscribe(res => {
          if (res) {
            this.fatchData();
            this.toastr.success(res.message);
            this.isProceess = false;
          }
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
        });
      }
    }).catch(() => { });
  }

  onEdit(dataItem: Customers) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddUpdateCustomersComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as AddUpdateCustomersComponent;
    componentInstance.customersMaster = dataItem;

    modalRef.result.then((data: Customers) => {
      if (data) {
        var model: UpdateCustomersMasterModel = {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          contact: dataItem.contact,
          address: data.address.trim(),
          state: data.state.trim(),
          city: data.city.trim(),
          updatedBy: this.userData.userId,
          postcode: data.postcode,
          customerId: dataItem.customerId,
          status: data.status
        }
        this.masterName = `/customer/${dataItem?.customerId}`;
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.fatchData();
        }, error => {
          this.toastr.error(error.error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }


  onViewDetail(dataItem: Customers) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewCustomersComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewCustomersComponent;
    componentInstance.customersMaster = dataItem;
  }

  onDelete(dataItem: Customers) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this ?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/customer/${dataItem?.customerId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(res => {
          this.isProceess = false;
          this.toastr.success(res.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.message);
        });
      }
    }).catch(() => { });;

  }

  sendMessage(dataItem: Customers) {
    this.router.navigate([`/admin/inbox/${dataItem.customerId}`]);
    // window.location.href = `/admin/inbox/${dataItem.customerId}`
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  // sendMessage(no: any) {

}
