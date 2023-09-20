import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ViewTicketComponent } from '../../components/view-ticket/view-ticket.component';
import { AddEditeTicketComponent } from '../../components/add-edite-ticket/add-edite-ticket.component';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AppService } from 'src/app/_services/app.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { UpdateTicketComponent } from '../../update-ticket/update-ticket.component';
import { Subscription, delay, take } from 'rxjs';
import { FilterTicketComponent } from '../../components/filter-ticket/filter-ticket.component';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  userData: any;
  data: ticketMasterModel[] = [];
  term: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  subscription?: Subscription;
  tableSize: number = 10;
  tickitStatus = 'All';
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    public masterAPI: TickitService,
    private appService: AppService,
    private apiService: ApiService
  ) {
    this.titleService.setTitle('CDC - Ticket');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }

  selectStatus(e: any) {
    this.tickitStatus = e.target.value;
    if (this.tickitStatus === this.tickitStatus && this.userData?.role?.roleName !== 'Admin') {
      this.masterName = `/ticket/createdBy/${this.userData.userId}`;
    } else if (this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/createdBy/${this.userData.userId}/ticketStatus/${e}`;
    } else if (
      this.tickitStatus === this.tickitStatus &&
      this.userData?.role?.roleName === 'Admin'
    ) {
      this.masterName = `/ticket/ticketscomments`;
    } else if (this.userData?.role?.roleName === 'Admin') {
      this.masterName = `/ticket/ticketStatus/${e}`;
    } else if (this.userData?.role?.roleName === 'User') {
      this.masterName = `/ticket/createdBy/${this.userData.userId}/ticketStatus/${e}`;
    }
    this.isProceess = true;
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.data = data;
          this.count = this.data.length;
          this.cd.detectChanges();
          this.isProceess = false;
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  fatchData() {
    this.tickitStatus = 'All';
    if (this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/createdBy/${this.userData.userId}`;
    } else if (this.userData?.role?.roleName === 'Admin') {
      this.masterName = `/ticket/ticketscomments`;
    } else if (this.userData?.role?.roleName === 'User') {
      this.masterName = `/ticket/createdBy/${this.userData.userId}`;
    }
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.data = data;
          this.count = this.data.length;
          this.cd.detectChanges();
          this.isProceess = false;
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }



  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditeTicketComponent, {
      size: 'xl',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: ticketMasterModel) => {
        if (data) {
          var model: any = {
            createdBy: this.userData.userId,
            createForUser: data.createForUser,
            status: data.status,
            shortNotes: data.shortNotes,
            assignedTo: data.assignedTo,
            departmentId: data.department,
            issueId: data.issue,
            priority: data.priority,
            alternativeContactNo: data.alternativeContactNo,
            serviceTitleId: data.serviceTitle,
            subCategoryId: data.subCategory,
            categoryId: data.category,
            emailId: this.userData.email,
            comment: data.additionalComments || ' ',
            mode:"User"
          };
          var commentModel: any = {
            additionalMessage: data.additionalComments || ' ',
            userId: this.userData.userId,
          };
          let formData = new FormData();

          if (data.file === null) {
          } else {
            formData.append('file', data.file);
          }

          formData.append('userData', JSON.stringify(model));
          // formData.append('comment', JSON.stringify(commentModel));
          this.isProceess = true;
          this.subscription = this.masterAPI
            .saveMasterData(formData)
            .pipe(take(1))
            .subscribe(
              (responseData) => {
                this.isProceess = false;
                this.toastr.success('Ticket Master Added!');
                this.tickitStatus = 'All';
                this.cd.detectChanges();
                this.fatchData();
              },
              (error) => {
                this.isProceess = false;
                this.toastr.error('Error while saving Ticket!');
              }
            );
        }
      })
      .catch(() => {});
  }

  onEdit(dataItem: ticketMasterModel) {
    const modalRef = this.modalService.open(AddEditeTicketComponent, {
      size: 'xl',
    });

    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    var componentInstance =
      modalRef.componentInstance as AddEditeTicketComponent;
    componentInstance.ticketsMaster = dataItem;

    modalRef.result
      .then((data: ticketMasterModel) => {
        if (data) {
          let Tstatus: any;
          if (this.userData?.role?.roleName !== 'Admin') {
            Tstatus = dataItem.ticketStatus;
          } else {
            Tstatus = data.ticketStatus;
          }
          var model: any = {
            // additionalComments:data.additionalComments,
            createForUser: data.createForUser,
            status: data.status,
            shortNotes: data.shortNotes,
            assignedTo: data.assignedTo,
            departmentId: data.department,
            issueId: data.issue,
            priority: data.priority,
            alternativeContactNo: data.alternativeContactNo,
            serviceTitleId: data.serviceTitle,
            subCategoryId: data.subCategory,
            categoryId: data.category,
            emailId: dataItem.emailId,
            updatedBy: this.userData.userId,
            ticketStatus: Tstatus,
            comment: data.additionalComments || ' ',
            mode: "User",
          };
          let formData = new FormData();
          if (data.file === null) {
          } else {
            formData.append('file', data.file);
          }
          formData.append('userData', JSON.stringify(model));
          // formData.append('comment', JSON.stringify(commentModel));
          this.isProceess = true;
          this.subscription = this.masterAPI
            .updateMasterData(formData, dataItem.ticketId)
            .pipe(take(1))
            .subscribe(
              (responseData: any) => {
                if (responseData) {
                  this.toastr.success(responseData.message);
                  this.fatchData();
                  this.tickitStatus = 'All';
                  this.cd.detectChanges();
                  this.isProceess = false;
                }
              },
              (error) => {
                this.isProceess = false;
                this.toastr.error('Error while saving Ticket!');
              }
            );
        }
      })
      .catch(() => {});
  }


  onFilter() {
    const modalRef = this.modalService.open(FilterTicketComponent, {
      size: 'xl',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
  }
  onUpdateTicket(dataItem: ticketMasterModel) {
    const modalRef = this.modalService.open(UpdateTicketComponent, {
      size: 'xl',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as UpdateTicketComponent;
    componentInstance.ticketsMaster = dataItem;
    modalRef.result
      .then((data: ticketMasterModel) => {
        if (data) {
          let Tstatus: any;
          if (this.userData?.role?.roleName !== 'Admin') {
            Tstatus = dataItem.ticketStatus;
          } else {
            Tstatus = data.ticketStatus;
          }

          var model: any = {
            createForUser: dataItem.createForUser?.userId,
            status: dataItem.status,
            shortNotes: dataItem.shortNotes,
            assignedTo: data.assignedTo,
            departmentId: dataItem.department?.departmentId,
            issueId: dataItem.issue?.issueId,
            priority: dataItem.priority?.id,
            alternativeContactNo: dataItem.alternativeContactNo,
            serviceTitleId: data.serviceTitle,
            subCategoryId: data.subCategory,
            categoryId: dataItem.category?.categoryId,
            emailId: dataItem.emailId,
            updatedBy: this.userData.userId,
            ticketStatus: Tstatus,
            comment: data.additionalComments || ' ',
            mode:"User"
          };
          let formData = new FormData();
          formData.append('file', data.file);
          formData.append('userData', JSON.stringify(model));
          this.isProceess = true;
          this.subscription = this.masterAPI
            .updateMasterData(formData, dataItem.ticketId)
            .pipe(take(1))
            .subscribe(
              (responseData) => {
                console.log("responseData",responseData);

                if (responseData) {
                  this.toastr.success('Ticket Updated!');
                  this.fatchData();
                  this.isProceess = false;
                }
              },
              (error) => {
                if(error.error.status =="failed"){
                  this.toastr.error(error.error.message);
                }
                this.isProceess = false;

              }
            );
        }
      })
      .catch(() => {});
  }
  onDownload() {
    const exportData = this.data.map((x) => {
      let updatedBy: any = ' ';
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName;
      } else {
        updatedBy = '';
      }
      return {
        Id: x.ticketId || '',
        Email: x.emailId || '',
        category: x.category?.categoryName || '',
        'Sub Category': x.subCategory?.subCategoryName || '',
        'Service Title': x.serviceTitle?.serviceName || '',
        Department: x.department?.departmentName || '',
        assignedTo: x.assignedTo?.firstName || '' + '' + x.assignedTo?.lastName,
        Priority: x.priority?.priorityName || '',
        alternativeContactNo: x.alternativeContactNo || '',
        'Short Notes': x.shortNotes || '',
        AdditionalComments: x.additionalComments || '',
        'created By':
          x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        'Created Date': moment(x.createdDate || '').format('llll'),
        'Updated By': updatedBy,
        'Updated Date': moment(x.updatedDate || '').format('llll'),

        Issue: x.issue?.issueName || '',
        'Create For User': x.createForUser?.username || '',
        'File Url': x.fileUrl || '',
      };
    });
    const headers = [
      'Id',
      'Email',
      'category',
      'Sub Category',
      'Service Title',
      'Department',
      'assignedTo',
      'alternativeContactNo',
      'Priority',
      'Issue',
      'File Url',
      'Short Notes',
      'AdditionalComments',
      'Create For User',
      'Created Date',
      'created By',
      'Updated Date',
      'Updated By',

    ];
    this.appService.exportAsExcelFile(exportData, 'Ticket', headers);
  }

  onViewDetail(dataItem: ticketMasterModel) {
    // this.isProceess = true;
    const modalRef = this.modalService.open(ViewTicketComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
    });
    var componentInstance =
      modalRef.componentInstance as AddEditeTicketComponent;
    componentInstance.ticketsMaster = dataItem;
  }
  onDelete(dataItem: ticketMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message =
      'Are you sure you want to delete this Delete ticket master?';
    modalRef.result
      .then(async (canDelete: boolean) => {
        if (canDelete) {
          this.masterName = `/ticket/${dataItem?.ticketId}`;
          this.isProceess = true;
          this.subscription = await this.apiService
            .deleteID(this.masterName)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.isProceess = false;
                this.toastr.success('Ticket Deleted!');
                this.fatchData();
              },
              (error) => {
                this.isProceess = false;
                this.toastr.error('Error while deleting Ticket!');
              }
            );
        }
      })
      .catch(() => {});
  }
  onbulkUpload() {
    this.isProceess = true;
    const modalRef = this.modalService.open(BulkUploadComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as BulkUploadComponent;
    componentInstance.heading = 'Company';
    componentInstance.message =
      'Are you sure you want to delete this Delete Company master?';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
