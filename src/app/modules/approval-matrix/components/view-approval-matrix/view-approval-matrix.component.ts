import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { UserMaster } from 'src/app/_models';
import { Approvalmatrix } from 'src/app/_models/aproval-matrix';

@Component({
  selector: 'app-view-approval-matrix',
  templateUrl: './view-approval-matrix.component.html'
})
export class ViewApprovalMatrixComponent {

  isProceess:boolean= true;


  onCancel() {
    this.activeModal.close(false);
  }



  private _approvalMatrixMaster: Approvalmatrix | undefined;
  dropdownSettings:IDropdownSettings={};
  dropdownSettings1:IDropdownSettings={};
  approvalMatrixMasterForm: any;
  department:any;
  masterName?: any;
  data: any;
  userRole?:string;
  duser: UserMaster[] = [];
  userData: any;
  l3User?:any;
  filteredL3Users:any;
  selectedItems=[];


  get title(): string {
    return this._approvalMatrixMaster ? "Edit Approval Matrix Master" : " Add Approval Matrix Master";
  }

  set ApprovalmatrixMaster(value: Approvalmatrix) {
    this._approvalMatrixMaster = value;
    this.data = value;    
    if (this._approvalMatrixMaster) {
    
      this.approvalMatrixMasterForm.patchValue({
        departmentId: this._approvalMatrixMaster.department?.departmentId,
        L1Manager:this._approvalMatrixMaster?.userL1[0].username,
        L2Manager: [this.selectedItems] = this._approvalMatrixMaster?.userL2, // Set L2Manager based on userL2
        L3Manager:[this.selectedItems] = this._approvalMatrixMaster?.userL3,
        status:this._approvalMatrixMaster.status,
      });
      this.approvalMatrixMasterForm.controls["departmentId"].disable();
      this.approvalMatrixMasterForm.controls["L1Manager"].disable();
      this.approvalMatrixMasterForm.controls["L2Manager"].disable();
      this.approvalMatrixMasterForm.controls["L3Manager"].disable();
      this.approvalMatrixMasterForm.controls["status"].disable();
      this.getUser();
    }
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
      status:[true, [Validators.required]]
    });

    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.getData();
    this.l3manager();

    this.dropdownSettings = {
      idField: 'username',
      textField: 'firstName',
      // enableCheckAll: true,
      // selectAllText: "Select All Items From List",
      // unSelectAllText: "UnSelect All Items From List",
      // allowSearchFilter: true
    };

    this.dropdownSettings1 = {
      idField: 'username',
      textField: 'firstName',
      // enableCheckAll: true,
      // selectAllText: "Select All Items From List",
      // unSelectAllText: "UnSelect All Items From List",
      // allowSearchFilter: true
    };
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

  get filteredUsers() {
    // Filter users with the role "Resolver"
    return this.duser.filter(user => user.role && user.role.roleName === 'Resolver');
  }
  changed(e: any) {
    if (e.target.value !== '') {
      this.masterName = `/users/active/${e.target.value}`;
      this.apiService.getAll(this.masterName).subscribe(
        (data) => {
          this.duser = data;
          
          // console.log(this.duser );
          this.isProceess = false;
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


  getUser(){
    this.masterName = `/users/active/${this._approvalMatrixMaster?.department?.departmentId}`;
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

  l3manager(){
    this.masterName = `/users/active/`;
    this.apiService.getAll(this.masterName).subscribe(
      (data) => {
        this.l3User = data;
        this.filteredL3Users = this.l3User.filter((user: { role: { roleName: string; }; }) => user.role?.roleName !== 'User');
        this.isProceess = false;
        this.cd.detectChanges();
      },
      (error) => {
        this.isProceess = false;
      }
    );
  }
}
