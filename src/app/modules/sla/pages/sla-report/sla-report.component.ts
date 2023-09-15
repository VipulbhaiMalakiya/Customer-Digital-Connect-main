import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { issueMasterModel } from 'src/app/_models/issue';
import { slaMasterModel } from 'src/app/_models/sla';
import { AppService } from 'src/app/_services/app.service';
import { AddEditeIssueComponent } from 'src/app/modules/issue/components/add-edite-issue/add-edite-issue.component';
import { ViewIssueComponent } from 'src/app/modules/issue/components/view-issue/view-issue.component';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ViewSlaComponent } from '../../components/view-sla/view-sla.component';

@Component({
  selector: 'app-sla-report',
  templateUrl: './sla-report.component.html',
  styleUrls: ['./sla-report.component.css']
})
export class SlaReportComponent {
  isProceess: boolean = true;
  term: any;
  data: slaMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
  ) {
    this.titleService.setTitle("CDC - Over The SLA Reports");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/ticket/sla";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data.data;
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

      let assignedTo: any = ' '
      if (x.assignedTo?.firstName != undefined) {
        assignedTo = x.assignedTo?.firstName || '' + ' '  + x.assignedTo?.lastName || ''
      }
      else {
        assignedTo = ''
      }

      let resolveBy: any = ' '
      if (x.resolveBy?.firstName != undefined) {
        resolveBy =x.resolveBy?.firstName || '' + ' '  + x.resolveBy?.lastName || ''
      }
      else {
        resolveBy = ''
      }

      let createForUser: any = ' '
      if (x.createForUser?.firstName != undefined) {
        createForUser =x.createForUser?.firstName || '' + ' '  + x.createForUser?.lastName || ''
      }
      else {
        createForUser = ''
      }

      let createForCustomer: any = ' '
      if (x.createForUser?.firstName != undefined) {
        createForCustomer =x.createForCustomer?.firstName || '' + ' '  + x.createForCustomer?.lastName || ''
      }
      else {
        createForCustomer = ''
      }

      let updatedByCustomer: any = ' '
      if (x.updatedByCustomer?.firstName != undefined) {
        createForCustomer =x.updatedByCustomer?.firstName || '' + ' '  + x.updatedByCustomer?.lastName || ''
      }
      else {
        updatedByCustomer = ''
      }

      return {
        "Id": x.ticketId || '',
        "ticketNo": x.ticketNo || '',
        "emailId": x.emailId || '',
        "category":x.category?.categoryName || '',
        "subCategory":x.subCategory?.subCategoryName || '',
        "serviceTitle":x.serviceTitle?.serviceName ||'' ,
        "department":x.department?.departmentName || '',
        "alternativeContactNo":x.alternativeContactNo || '',
        "priority":x.priority || '',
        "issue":x.issue?.issueName || '',
        "assignedTo":assignedTo,
        "resolveBy":resolveBy,
        "createForUser":createForUser,
        "createForCustomer":createForCustomer,
        "updatedByCustomer":updatedByCustomer,
        "mode":x.mode || '',
        "resolveTimeStamp":x.resolveTimeStamp || '',
        "sla":x.sla,
        "ticketStatus":x.ticketStatus || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = [
      "Id", "ticketNo", "emailId","category","subCategory","serviceTitle",
      "department","alternativeContactNo","priority","issue","assignedTo",
      "resolveBy","createForUser","createForCustomer","updatedByCustomer",
      "mode","resolveTimeStamp","sla","ticketStatus",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "sla-Report", headers);
  }



  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onViewDetail(dataItem: slaMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewSlaComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewSlaComponent;
    componentInstance.serviceTitleMaster = dataItem;
  }
}
