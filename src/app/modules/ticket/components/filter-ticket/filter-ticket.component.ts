import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { UserMaster } from 'src/app/_models';
import { CategoryMasterModel } from 'src/app/_models/category';
import { MaindefaultPriorityMaster } from 'src/app/_models/defaultPriority';
import { departmentMasterModel } from 'src/app/_models/department';
import { issueMasterModel } from 'src/app/_models/issue';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ticketMasterModel } from 'src/app/_models/ticket';

@Component({
  selector: 'app-filter-ticket',
  templateUrl: './filter-ticket.component.html',
  styleUrls: ['./filter-ticket.component.css']
})
export class FilterTicketComponent {
  private _tickettsMaster: ticketMasterModel | undefined;
  isProceess: boolean = true;
  ticketMasterForm: any;
  data: CategoryMasterModel[] = [];
  sdata: subCategoryMasterModel[] = [];
  data1: servicetitleMasterModel[] = [];
  dept: departmentMasterModel[] = [];
  aciveUser: UserMaster[] = [];
  duser: UserMaster[] = [];
  issueData: issueMasterModel[] = [];
  slaData: MaindefaultPriorityMaster[] = [];
  uploadFile: any = "";
  selectedValue: any;
  uploadFile1: any = "";
  categoryid: any;
  masterName?: any;
  userData:any;
  nrSelect:any;
  abc: any;
  imagePath?: string;
  chek: any;

  get title(): string {
    return this._tickettsMaster ? "Edit Ticket" : " Add Ticket";
  }
  set ticketsMaster(value: ticketMasterModel) {
    this._tickettsMaster = value;
    this.chek = value;
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService

  ) {
    this.ticketMasterForm = this.formBuilder.group({
      subCategory: [''],
      category: [''],
      serviceTitle: [''],
      priority: [''],
      issue: [''],
      department: [''],
      assignedTo: [''],
      createForUser: [''],
      ticketStatus:[''],
      resolvedBy:[''],
      startingDate:[''],
      endingDate:['']
    });

    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
    this.nrSelect = this.userData.userId;
  }
  ngOnInit(): void {
    this.categoryid = this._tickettsMaster;
    this.uploadFile = this._tickettsMaster?.fileUrl
    this.fatchData();
    this.getDepartment();
    this.ActiveUser();
    this.activeIssue();
  }


  fatchData() {
    this.masterName = "/category/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }


  activeIssue() {
    this.masterName = "/issue/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.issueData = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }

  selectserviceTitle(e: any) {
    this.masterName = `/servicetitle/servicePriority/${e}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.slaData = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }

  ActiveUser() {
    this.masterName = "/users/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.aciveUser = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }
  getDepartment() {
    this.masterName = "/department/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.dept = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }
  selectDepartment(e: any) {
    this.masterName = `/users/active/${e}`;
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.duser = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }


  changed(e: any) {
    this.masterName = `/subcategory/active/${e}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.sdata = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }
  selectCategory(e: any) {

    this.masterName = "/servicetitle/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data1 = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.ticketMasterForm.valid) {
      let data = {
        subCategory: this.ticketMasterForm.value.subCategory,
        category: this.ticketMasterForm.value.category,
        serviceTitle: this.ticketMasterForm.value.serviceTitle,
        priority: this.ticketMasterForm.value.priority,
        issue: this.ticketMasterForm.value.issue,
        department: this.ticketMasterForm.value.department,
        assignedTo: this.ticketMasterForm.value.assignedTo,
        createForUser: this.ticketMasterForm.value.createForUser,
        ticketStatus: this.ticketMasterForm.value.ticketStatus,
        resolvedBy: this.ticketMasterForm.value.resolvedBy,
        endingDate:this.ticketMasterForm.value.endingDate,
        startingDate:this.ticketMasterForm.value.startingDate
      }
      console.log(data);

      // this.activeModal.close(data)
    } else {
    }
  }
}
