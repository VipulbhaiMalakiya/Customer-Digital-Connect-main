import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription, delay, take } from 'rxjs';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';
import { ViewTicketComponent } from '../../components/view-ticket/view-ticket.component';
import { AddEditeTicketComponent } from '../../components/add-edite-ticket/add-edite-ticket.component';
import {  ViewChild, ElementRef } from '@angular/core';
import { OnAproveComponent } from '../../components/on-aprove/on-aprove.component';
import { OnRejectComponent } from '../../components/on-reject/on-reject.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  isProceess: boolean = true;
  @ViewChild('sel3', { static: false }) sel3!: ElementRef;

  userData: any;
  data: ticketMasterModel[] = [];
  term: any;
  tickitStatus = "All";
  masterName?: any;
  page: number = 1;
  count: number = 0;
  subscription?: Subscription;
  tableSize: number = 10;
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
    this.titleService.setTitle("CDC - Assigned To Me Ticket");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }
  trackByFn(index: number, item: any): number {
    return item.ticketId;
  }
  selectStatus(e: any) {
    if(e === this.tickitStatus){
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}`;
    }

    else if (this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}/ticketStatus/${e}`;
    }
    else if (this.userData?.role?.roleName === 'Admin') {
      this.masterName = `/ticket/ticketscomments`;
    }
    else if (this.userData?.role?.roleName === 'User') {
      this.masterName = `/ticket/ticketscomments`;
    }
    else if (this.userData?.role?.roleName === 'Approver') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}/ticketStatus/${e}`;
    }

    this.isProceess = true;
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
      this.data = data;
      this.count = this.data.length;
      this.cd.detectChanges();
      this.isProceess = false;
    }, error => {
      this.isProceess = false;
    })
  }
  fatchData() {

    if (this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}`;
    }
    else if (this.userData?.role?.roleName === 'User') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}`;
    }
    else if (this.userData?.role?.roleName === 'Admin') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}`;
    }
    else if (this.userData?.role?.roleName === 'Approver') {
      this.masterName = `/ticket/AssignedTo/${this.userData.userId}`;
    }

    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
      this.data = data;
      this.count = this.data.length;
      this.cd.detectChanges();
      this.isProceess = false;
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

  onViewDetail(dataItem: ticketMasterModel) {
    // this.isProceess = true;
    const modalRef = this.modalService.open(ViewTicketComponent, { size: "xl", centered: true, backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ViewTicketComponent;
    componentInstance.ticketsMaster = dataItem;
  }

  onEdit(dataItem: ticketMasterModel) {
    const modalRef = this.modalService.open(AddEditeTicketComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeTicketComponent;
    componentInstance.ticketsMaster = dataItem;
    modalRef.result.then((data: any) => {
      if (data) {
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
          ticketStatus: data.ticketStatus,
          comment:data.additionalComments || ' ',
          mode:"User",
        }
        let formData = new FormData();
        if(data.file === null){

        }else{
          formData.append('file', data.file);
        }
        formData.append("userData", JSON.stringify(model));
        this.isProceess = true;
        this.subscription = this.masterAPI.updateMasterData(formData, dataItem.ticketId).pipe(take(1)).subscribe(responseData => {
          this.isProceess = false;
          this.toastr.success("Ticket Updated!");
          this.fatchData();
          this.sel3.nativeElement.value = 'All';
          this.sel3.nativeElement.dispatchEvent(new Event('change'));
        }, error => {
          this.isProceess = false;
          this.toastr.error("Error while saving Ticket!");
        });
      }
    }).catch(() => { });
  }
//l1
  onAprove(dataItem: ticketMasterModel){
    const modalRef = this.modalService.open(OnAproveComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          ticketid:dataItem.ticketId,
          approvalstatus:"APPROVED",
          updatedBy:this.userData.userId
        }
        this.isProceess = true;
        this.subscription = this.masterAPI.updateMasterData1(model).pipe(take(1)).subscribe(responseData => {
          this.isProceess = false;
          this.toastr.success("Ticket Updated!");
          this.fatchData();
          this.sel3.nativeElement.value = 'All';
          this.sel3.nativeElement.dispatchEvent(new Event('change'));
        }, error => {
          this.isProceess = false;
          this.toastr.error("Error while saving Ticket!");
        });
      }
    }).catch(() => { });
  }

  onReject(dataItem: ticketMasterModel){
    const modalRef = this.modalService.open(OnRejectComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }

    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          ticketid:dataItem.ticketId,
          approvalstatus:"REJECTED",
          updatedBy:this.userData.userId
        }
        this.isProceess = true;
        this.subscription = this.masterAPI.updateMasterData1(model).pipe(take(1)).subscribe(responseData => {
          this.isProceess = false;
          this.toastr.success("Ticket Updated!");
          this.fatchData();
          this.sel3.nativeElement.value = 'All';
          this.sel3.nativeElement.dispatchEvent(new Event('change'));
        }, error => {
          this.isProceess = false;
          this.toastr.error("Error while saving Ticket!");
        });
      }
    }).catch(() => { });
  }
//l1 End
  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy:any = ' '
      if(x.updatedBy?.firstName  != undefined ){
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else{
        updatedBy = ''
      }
      return {
        "Id": x.ticketId || '',
        "Email": x.emailId || '',
        "category": x.category?.categoryName || '',
        "Sub Category": x.subCategory?.subCategoryName || '',
        "Service Title": x.serviceTitle?.serviceName || '',
        "Department": x.department?.departmentName || '',
        "assignedTo": x.assignedTo?.firstName || '' + '' + x.assignedTo?.lastName,
        "Priority": x.priority?.priorityName || '',
        "alternativeContactNo": x.alternativeContactNo || '',
        "Short Notes": x.shortNotes || '',
        "AdditionalComments": x.additionalComments || '',
        "created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate',
        "Issue": x.issue?.issueName || '',
        "Create For User": x.createForUser?.username || '',
        "File Url": x.fileUrl || ''
      }
    });
    const headers = ["Id", "Email", "category", "Sub Category", "Service Title",
      "Department", "assignedTo", "alternativeContactNo", "priority", "Issue", "File Url",
      "Short Notes", "AdditionalComments", "Create For User",
      "Created Date", "created By", "Updated Date", "Updated By", "Status"];
    this.appService.exportAsExcelFile(exportData, "Ticket", headers);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
