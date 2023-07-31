import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { RoleMasterModel } from 'src/app/_models/role';

@Component({
  selector: 'app-view-roles-permissions',
  templateUrl: './view-roles-permissions.component.html'
})
export class ViewRolesPermissionsComponent {

  private _rolesPermissionsMaster: RoleMasterModel | undefined;
  isProceess: boolean = false;
  rolesPermissionsMasterForm: any;

  set roleMaster(value: RoleMasterModel) {
    this._rolesPermissionsMaster = value;
    let updatedBy:any = ' '
    if(this._rolesPermissionsMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._rolesPermissionsMaster.updatedBy?.firstName + ' ' + this._rolesPermissionsMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._rolesPermissionsMaster) {
      this.rolesPermissionsMasterForm.patchValue({
        roleName:this._rolesPermissionsMaster.roleName,
        status:this._rolesPermissionsMaster.status,
        // status:this._rolesPermissionsMaster.status ? 'Active' : 'Deactivate',
        roleDescription:this._rolesPermissionsMaster.roleDescription,
        roleId:this._rolesPermissionsMaster.roleId,
        createdDate: moment(this._rolesPermissionsMaster.createdDate || '').format("llll"),
        createdBy:this._rolesPermissionsMaster.createdBy?.firstName + ' ' + this._rolesPermissionsMaster.createdBy?.lastName,
        updatedDate:  moment(this._rolesPermissionsMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.rolesPermissionsMasterForm.controls["roleName"].disable();
      this.rolesPermissionsMasterForm.controls["status"].disable();
      this.rolesPermissionsMasterForm.controls["roleDescription"].disable();
      this.rolesPermissionsMasterForm.controls["roleId"].disable();
      this.rolesPermissionsMasterForm.controls["createdDate"].disable();
      this.rolesPermissionsMasterForm.controls["createdBy"].disable();
      this.rolesPermissionsMasterForm.controls["updatedDate"].disable();
      this.rolesPermissionsMasterForm.controls["updatedBy"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.rolesPermissionsMasterForm = this.formBuilder.group({
      roleName: [""],
      roleDescription: [''],
      status: ['', [Validators.required]],
      roleId:[''],
      createdDate:[''],
      createdBy:[''],
      updatedDate:[''],
      updatedBy:['']
    });
  }
  onCancel() {
    this.activeModal.close(false);
  }
}
