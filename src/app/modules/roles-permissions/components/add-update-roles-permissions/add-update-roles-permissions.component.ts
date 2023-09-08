import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleMasterModel } from 'src/app/_models/role';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-update-roles-permissions',
  templateUrl: './add-update-roles-permissions.component.html'
})
export class AddUpdateRolesPermissionsComponent {
  private _rolesPermissionsMaster: RoleMasterModel | undefined;
  isProceess: boolean = false;
  rolesPermissionsMasterForm: any;
  data:any;

  get title(): string {
    return this._rolesPermissionsMaster ? "Edit Roles & Permissions Master" : " Add Roles & Permissions Master";
  }


  set roleMaster(value: RoleMasterModel) {
    this._rolesPermissionsMaster = value;
    this.data = value;
    if (this._rolesPermissionsMaster) {
      this.rolesPermissionsMasterForm.patchValue({
        roleName:this._rolesPermissionsMaster.roleName,
        status:this._rolesPermissionsMaster.status,
        roleDescription:this._rolesPermissionsMaster.roleDescription,

      });
      // this.rolesPermissionsMasterForm.controls["email"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.rolesPermissionsMasterForm = this.formBuilder.group({
      roleName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
        ]],
      status: [true, [Validators.required]],
      roleDescription: ['', [Validators.required,noLeadingSpaceValidator()]]
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }


  onSubmit() {
    if (this.rolesPermissionsMasterForm.valid) {
      this.activeModal.close(this.rolesPermissionsMasterForm.value)
    } else {
      this.rolesPermissionsMasterForm.controls['roleName'].markAsTouched();
      this.rolesPermissionsMasterForm.controls['status'].markAsTouched();
      this.rolesPermissionsMasterForm.controls['roleDescription'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.rolesPermissionsMasterForm.controls[controlName].touched && this.rolesPermissionsMasterForm.controls[controlName].hasError(errorName);
  }
}
