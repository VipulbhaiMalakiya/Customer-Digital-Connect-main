import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, delay, take } from 'rxjs';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { AppService } from 'src/app/_services/app.service';
import { EditeTicketComponent } from '../../components/edite-ticket/edite-ticket.component';
import { ViewTicketComponent } from '../../components/view-ticket/view-ticket.component';

@Component({
  selector: 'app-depatment-ticket',
  templateUrl: './depatment-ticket.component.html',
  styleUrls: ['./depatment-ticket.component.css']
})
export class DepatmentTicketComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  userData: any;
  data: ticketMasterModel[] = [];
  term: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  subscription?: Subscription;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  tickitStatus = "All";

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    public masterAPI: TickitService,
    private appService: AppService,
    private apiService: ApiService
  ) {
    this.titleService.setTitle("CDC -  Department Tickets");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.masterName = `/ticket/departmentId/${this.userData.department.departmentId}`;
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      this.data = data;
      this.cd.detectChanges();
      this.isProceess = false;
    }, error => {
      this.isProceess = false;
    })
  }

  selectStatus(e: any) {
    if (e === this.tickitStatus && this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/departmentId/${this.userData.department.departmentId}`;
    }
    else if (this.userData?.role?.roleName === 'Resolver') {
      this.masterName = `/ticket/departmentId/${this.userData.department.departmentId}/ticketStatus/${e}`;
    }
    this.isProceess = true;
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      this.data = data;
      this.cd.detectChanges();
      this.isProceess = false;
    }, error => {
      this.isProceess = false;
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fatchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fatchData();
  }

  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy: any = ' '
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else {
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

  onViewDetail(dataItem: ticketMasterModel) {
    // this.isProceess = true;
    const modalRef = this.modalService.open(ViewTicketComponent, { size: "xl", centered: true, backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ViewTicketComponent;
    componentInstance.ticketsMaster = dataItem;
  }



  onEdit(dataItem: ticketMasterModel) {
    const modalRef = this.modalService.open(EditeTicketComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as EditeTicketComponent;
    componentInstance.ticketsMaster = dataItem;
    modalRef.result.then((data: ticketMasterModel) => {
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
          mode:"User"
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
        }, error => {
          this.isProceess = false;
          this.toastr.error("Error while saving Ticket!");
        });
      }
    }).catch(() => { });
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
