import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { UserMaster } from 'src/app/_models';
import { CategoryMasterModel } from 'src/app/_models/category';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-edite-ticket',
  templateUrl: './edite-ticket.component.html',
  styleUrls: ['./edite-ticket.component.css']
})
export class EditeTicketComponent {
  ticketMasterForm: any;
  private _tickettsMaster: ticketMasterModel | undefined;
  data: CategoryMasterModel[] = [];
  sdata: subCategoryMasterModel[] = [];
  data1: servicetitleMasterModel[] = [];
  userData: any;
  categoryid: any;
  masterName?: any;
  isProceess: boolean = true;
  duser: UserMaster[] = [];
  uploadFile: any = "";
  Comments:any;
  tNo:any;
  subject:any;
  updatedData:any;

  UserGet:any = [];
  results:any = [];

  set ticketsMaster(value: ticketMasterModel) {
    this._tickettsMaster = value;
    this.tNo = this._tickettsMaster.ticketNo;
    this.subject = this._tickettsMaster.shortNotes;
    this.updatedData = this._tickettsMaster;
    this.Comments = this.updatedData.additionalComments;
    if (this._tickettsMaster) {
      this.ticketMasterForm.patchValue({
        subCategory: this._tickettsMaster.subCategory?.subCategoryId,
        serviceTitle: this._tickettsMaster.serviceTitle?.serviceId,
        assignedTo: this._tickettsMaster.assignedTo?.userId,
        ticketStatus:this._tickettsMaster.ticketStatus,
      });
      // if(this.userData?.role?.roleName !== 'Admin'){
      //   this.ticketMasterForm.controls["subCategory"].disable();
      //   this.ticketMasterForm.controls["serviceTitle"].disable();
      //   this.ticketMasterForm.controls["assignedTo"].disable();
      //   this.ticketMasterForm.controls["ticketStatus"].disable();
      //   this.ticketMasterForm.controls["additionalComments"].disable();
      //   this.ticketMasterForm.controls["workNotes"].disable();
      // }
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.ticketMasterForm = this.formBuilder.group({
      subCategory: ['', [Validators.required]],
      serviceTitle: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
      ticketStatus:['', [Validators.required]],
      additionalComments:['', [Validators.required,noLeadingSpaceValidator()]],
      workNotes:['',[noLeadingSpaceValidator()]],
      file: [''],
    });

    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.categoryid = this._tickettsMaster;
    this.subCategory();
    this.getserviceTitle();
    this.selectDEPT();
    this.onEdit();
  }

  onEdit() {
    for (const item of this.Comments) {
      this.masterName = `/userid/${item.userId}`;
      this.apiService.getAll(this.masterName).subscribe((data) => {
        let item =  data.data[0];
        this.UserGet.push(item);
        this.isProceess = false;
        this.cd.detectChanges();
      });
    }
     this.results = this.UserGet;
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  onFileChange(event: any) {
    let data;

    if (event.target.files && event.target.files[0])
/**
 * The `onEdit()` function retrieves user data for each comment in the `Comments` array and stores it
 * in the `UserGet` array, then assigns the `UserGet` array to the `results` variable.
 */
      data = event.target.files[0];
    if (event.target.files[0].name && event.target.files.length > 0) {
      data = event.target.files[0];
    }
    else {
      data = "null"
    }
    this.uploadFile = data;
  }

  attachmentDownload(){
    this.masterName = `/ticket/file/52`;
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.cd.detectChanges();
    },error => {
    });

  }

  subCategory() {
    this.masterName = `/subcategory/active/${this.categoryid.category?.categoryId}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.sdata = data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  selectCategory(e: any) {
    if(e !==''){
      this.masterName = `/servicetitle/active/${e}`;
      this.apiService.getAll(this.masterName).subscribe(data => {
        this.data1 = data;
        this.isProceess = false;
        this.cd.detectChanges();
      });
    }else{
      this.data1 = [];
      this.ticketMasterForm .get('serviceTitle').setValue('');
    }
    this.ticketMasterForm .get('serviceTitle').setValue('');

  }

  getserviceTitle() {
    this.masterName = `/servicetitle/active/${this.categoryid.subCategory?.subCategoryId}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data1 = data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  selectDEPT() {
    this.masterName = `/users/active/${this.categoryid.department?.departmentId}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.duser = data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  onSubmit() {

    if (this.ticketMasterForm.valid) {
      let data = {
        subCategory: this.ticketMasterForm.value.subCategory,
        serviceTitle: this.ticketMasterForm.value.serviceTitle,
        ticketStatus: this.ticketMasterForm.value.ticketStatus,
        assignedTo : this.ticketMasterForm.value.assignedTo,
        additionalComments:this.ticketMasterForm.value.additionalComments,
        workNotes:this.ticketMasterForm.value.workNotes,
        file: this.uploadFile || null ,
      }
      this.activeModal.close(data)
    } else {
      this.ticketMasterForm.controls['subCategory'].markAsTouched();
      this.ticketMasterForm.controls['serviceTitle'].markAsTouched();
      this.ticketMasterForm.controls['assignedTo'].markAsTouched();
      this.ticketMasterForm.controls['ticketStatus'].markAsTouched();
      this.ticketMasterForm.controls['additionalComments'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.ticketMasterForm.controls[controlName].touched && this.ticketMasterForm.controls[controlName].hasError(errorName);
  }
}
