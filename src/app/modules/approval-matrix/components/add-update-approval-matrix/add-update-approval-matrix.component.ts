import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { ApprovalMatrixMaster } from 'src/app/_models/master';
import { UserMaster } from 'src/app/_models/user';

@Component({
  selector: 'app-add-update-approval-matrix',
  templateUrl: './add-update-approval-matrix.component.html'
})
export class AddUpdateApprovalMatrixComponent implements OnInit{
  private _approvalMatrixMaster: ApprovalMatrixMaster | undefined;
  isProceess: boolean = false;
  approvalMatrixMasterForm: any;
  department:any;
  masterName?: any;
  data: any;
  userRole?:string;
  duser: UserMaster[] = [];
  userData: any;
  l3User?:any;

  get title(): string {
    return this._approvalMatrixMaster ? "Edit Approval Matrix Master" : " Add Approval Matrix Master";
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService

  ) {
    this.approvalMatrixMasterForm = this.formBuilder.group({
      departmentId: ["", [Validators.required]],
      L1Manager: ['', [Validators.required]],
      L2Manager: ['', [Validators.required]],
      L3Manager: ['', [Validators.required]],
    });

    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.getData();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  getData() {
    this.masterName ="/department/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      this.data = data;
      this.isProceess = false;
      this.cd.detectChanges();
    },error => {
      this.isProceess = false;
    });
  }

  changed(e: any) {
    if (e.target.value !== '') {
      this.masterName = `/users/active/${e.target.value}`;
      this.apiService.getAll(this.masterName).subscribe(
        (data) => {
          this.duser = data;
          // console.log(this.duser );
          this.isProceess = false;
          this.l3manager();
          this.cd.detectChanges();
        },
        (error) => {
          this.isProceess = false;
        }
      );
    } else {
       this.duser = [];
      this.approvalMatrixMasterForm.get('L1Manager').setValue('');
      this.approvalMatrixMasterForm.get('L2Manager').setValue('');
      this.approvalMatrixMasterForm.get('L3Manager').setValue('');
    }
    this.approvalMatrixMasterForm.get('L1Manager').setValue('');
    this.approvalMatrixMasterForm.get('L2Manager').setValue('');
    this.approvalMatrixMasterForm.get('L3Manager').setValue('');
  }


  l3manager(){
    this.masterName = `/users/active/`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.l3User = data;
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }


  onSubmit() {
    if (this.approvalMatrixMasterForm.valid) {
      console.log(this.approvalMatrixMasterForm.value);

      // this.activeModal.close(this.companyMasterForm.value)
    } else {
      this.approvalMatrixMasterForm.controls['departmentId'].markAsTouched();
      this.approvalMatrixMasterForm.controls['L1Manager'].markAsTouched();
      this.approvalMatrixMasterForm.controls['L2Manager'].markAsTouched();
      this.approvalMatrixMasterForm.controls['L3Manager'].markAsTouched();

    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.approvalMatrixMasterForm.controls[controlName].touched && this.approvalMatrixMasterForm.controls[controlName].hasError(errorName);
  }
}
