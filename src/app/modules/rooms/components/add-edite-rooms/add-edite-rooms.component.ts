import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-rooms',
  templateUrl: './add-edite-rooms.component.html',
  styleUrls: ['./add-edite-rooms.component.css']
})
export class AddEditeRoomsComponent {

  private _categoryMaster: any | undefined;
  isProceess: boolean = false;
  data:any;
  CategoryMasterForm: any;
  get title(): string {
    return this._categoryMaster ? "Edit RooM Master" : " Add Room Master";
  }
  set categoryMaster(value: any) {
    this.data = value;
    this.isProceess =true;
    this._categoryMaster = value;
    if (this._categoryMaster) {
      this.CategoryMasterForm.patchValue({
        roomNumber:this._categoryMaster.roomNumber,
        roomOccupied:this._categoryMaster.roomOccupied,
        roomStatus:this._categoryMaster.roomStatus,
      });
      // this.rolesPermissionsMasterForm.controls["email"].disable();
      this.isProceess = false;
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.CategoryMasterForm = this.formBuilder.group({
      roomNumber: ["", [
        Validators.required,,
      ]],
      roomOccupied: [false, [Validators.required]],
      roomStatus: [true, [Validators.required]],
    });
  }


  onCancel() {
    this.isProceess = false;
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.CategoryMasterForm.valid) {
      this.activeModal.close(this.CategoryMasterForm.value)
    } else {
      this.CategoryMasterForm.controls['categoryName'].markAsTouched();
      this.CategoryMasterForm.controls['status'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.CategoryMasterForm.controls[controlName].touched && this.CategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
