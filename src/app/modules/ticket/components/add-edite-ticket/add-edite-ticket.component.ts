import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { CategoryMasterModel } from 'src/app/_models/category';
import {
  MaindefaultPriorityMaster,
  defaultPriorityMaster,
} from 'src/app/_models/defaultPriority';
import { departmentMasterModel } from 'src/app/_models/department';
import { issueMasterModel } from 'src/app/_models/issue';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { UserMaster } from 'src/app/_models/user';
@Component({
  selector: 'app-add-edite-ticket',
  templateUrl: './add-edite-ticket.component.html',
  styleUrls: ['./add-edite-ticket.component.css'],
})
export class AddEditeTicketComponent {
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
  uploadFile: any = '';
  selectedOption: any;
  selectedOption1: any;
  selectedValue: any;
  uploadFile1: any = '';
  categoryid: any;
  masterName?: any;
  userData: any;
  nrSelect: any;
  abc: any;
  imagePath?: string;
  chek: any;

  get title(): string {
    return this._tickettsMaster ? 'Edit Ticket' : ' Add Ticket';
  }
  set ticketsMaster(value: ticketMasterModel) {
    this._tickettsMaster = value;

    this.chek = value;
    if (this._tickettsMaster) {
      this.ticketMasterForm.patchValue({
        category: this._tickettsMaster.category?.categoryId,
        subCategory: this._tickettsMaster.subCategory?.subCategoryId,
        serviceTitle: this._tickettsMaster?.serviceTitle?.serviceId,
        alternativeContactNo: this._tickettsMaster.alternativeContactNo,
        priority: this._tickettsMaster.priority?.id,
        issue: this._tickettsMaster.issue?.issueId,
        department: this._tickettsMaster.department?.departmentId,
        assignedTo: this._tickettsMaster.assignedTo?.userId,
        shortNotes: this._tickettsMaster.shortNotes,
        status: this._tickettsMaster.status,
        createForUser: this._tickettsMaster.createForUser?.userId,
      });
      this.imagePath = this._tickettsMaster.filename;
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
      category: ['', [Validators.required]],
      serviceTitle: ['', [Validators.required]],
      alternativeContactNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      priority: ['', [Validators.required]],
      issue: ['', [Validators.required]],
      department: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
      shortNotes: ['', [Validators.required]],
      status: [true, [Validators.required]],
      createForUser: ['', [Validators.required]],
      file: [''],
      additionalComments: ['', [Validators.required]],
    });

    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
    this.nrSelect = this.userData.userId;
  }
  ngOnInit(): void {
    this.categoryid = this._tickettsMaster;
    this.uploadFile = this._tickettsMaster?.fileUrl;
    // this.slaGetData();
    this.fatchData();
    if (this._tickettsMaster) {
      this.subCategory();
      this.getserviceTitle();

      this.getPriority();
    }
    this.getDepartment();
    this.ActiveUser();
    this.activeIssue();
    this.selectDepartment();
    // this.selectDEPT();
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    const input = event.key;
    if (!allowedKeys.includes(input) && isNaN(parseInt(input, 10))) {
      event.preventDefault();
    }
  }

  fatchData() {
    this.masterName = '/category/active';
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.data = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }

  attachmentDownload() {
    this.isProceess = true;
    this.masterName = `/ticket/file/52`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }

  activeIssue() {
    this.masterName = '/issue/active';
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.issueData = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }

  selectserviceTitle(e: any) {
    if (e.target.value !== '') {
      this.masterName = `/servicetitle/servicePriority/${e.target.value}`;
      this.apiService.getAll(this.masterName).subscribe(
        (data) => {
          this.slaData = data;
          this.selectedOption = this.slaData[0].defaultPriority.id;

          this.isProceess = false;
          this.cd.detectChanges();
        },
        (error) => {
          this.isProceess = false;
        }
      );
    }
    else{
      this.slaData = [];
      this.ticketMasterForm .get('priority').setValue('');
    }
  }
  getPriority() {
    this.masterName = `/servicetitle/servicePriority/${this.categoryid.serviceTitle?.serviceId}`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.slaData = data;
        this.selectedOption = this.slaData[0].defaultPriority.id;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  onFileChange(event: any) {
    let data;

    if (event.target.files && event.target.files[0])
      data = event.target.files[0];
    if (event.target.files[0].name && event.target.files.length > 0) {
      data = event.target.files[0];
    } else {
      data = 'null';
    }
    this.uploadFile = data;
  }
  ActiveUser() {
    this.masterName = '/users/active';
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.aciveUser = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  getDepartment() {
    this.masterName = '/department/active';
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.dept = data;
        this.selectedOption1 = this.userData?.department?.departmentId;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  selectDepartment() {
    this.masterName = `/users/active/${this.userData?.department?.departmentId}`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.duser = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  selectDEPT() {
    this.masterName = `/users/active/${this.categoryid.department?.departmentId}`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.duser = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  subCategory() {
    this.masterName = `/subcategory/active/${this.categoryid.category?.categoryId}`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.sdata = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
  changed(e: any) {
    if (e.target.value !== '') {
      this.masterName = `/subcategory/active/${e.target.value}`;
      this.apiService.getAll(this.masterName).subscribe(
        (data) => {
          this.sdata = data;
          this.isProceess = false;
          this.cd.detectChanges();
        },
        (error) => {
          this.isProceess = false;
        }
      );
    } else {
      this.sdata = [];
      // Set the value of the "Sub Category" select element to an empty string
      this.ticketMasterForm .get('subCategory').setValue('');
    }
  }


  selectCategory(e: any) {
    if (e.target.value !== '') {
      this.masterName = `/servicetitle/active/${e.target.value}`;
      this.apiService.getAll(this.masterName).subscribe(
        (data) => {
          this.data1 = data;
          this.isProceess = false;
          this.cd.detectChanges();
        },
        (error) => {
          this.isProceess = false;
        }
      );
    } else {
      this.data1 = [];
      this.ticketMasterForm .get('serviceTitle').setValue('');
    }
  }
  getserviceTitle() {
    this.masterName = `/servicetitle/active/${this.categoryid.subCategory?.subCategoryId}`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.data1 = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
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
        alternativeContactNo: this.ticketMasterForm.value.alternativeContactNo,
        priority: this.ticketMasterForm.value.priority,
        issue: this.ticketMasterForm.value.issue,
        department: this.ticketMasterForm.value.department,
        assignedTo: this.ticketMasterForm.value.assignedTo,
        shortNotes: this.ticketMasterForm.value.shortNotes,
        additionalComments: this.ticketMasterForm.value.additionalComments,
        createForUser: this.ticketMasterForm.value.createForUser,
        status: this.ticketMasterForm.value.status,
        file: this.uploadFile || null,
      };

      this.activeModal.close(data);
    } else {
      this.ticketMasterForm.controls['subCategory'].markAsTouched();
      this.ticketMasterForm.controls['category'].markAsTouched();
      this.ticketMasterForm.controls['serviceTitle'].markAsTouched();
      this.ticketMasterForm.controls['alternativeContactNo'].markAsTouched();
      this.ticketMasterForm.controls['priority'].markAsTouched();
      this.ticketMasterForm.controls['issue'].markAsTouched();
      this.ticketMasterForm.controls['department'].markAsTouched();
      this.ticketMasterForm.controls['assignedTo'].markAsTouched();
      this.ticketMasterForm.controls['shortNotes'].markAsTouched();
      this.ticketMasterForm.controls['additionalComments'].markAsTouched();
      this.ticketMasterForm.controls['status'].markAsTouched();
      this.ticketMasterForm.controls['createForUser'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return (
      this.ticketMasterForm.controls[controlName].touched &&
      this.ticketMasterForm.controls[controlName].hasError(errorName)
    );
  }
}
