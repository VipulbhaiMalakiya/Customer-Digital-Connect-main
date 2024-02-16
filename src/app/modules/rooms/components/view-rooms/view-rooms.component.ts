import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { quickrepliesModel } from 'src/app/_models/quickreplies';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent {
  private _categoryMaster: any | undefined;
  isProceess: boolean = false;
  data:any;
  dataArray: any[] = [];
  CategoryMasterForm: any;
  get title(): string {
    return this._categoryMaster ? "Edit Custom Auto Reply" : " Add Custom Auto Reply";
  }
  set categoryMaster(value: any) {
    this.data = value;
    this.isProceess =true;
    this._categoryMaster = value;
    if (this._categoryMaster) {
      this.CategoryMasterForm.patchValue({
        roomId:this._categoryMaster.roomId,
        roomNumber:this._categoryMaster.roomNumber,
        roomOccupied:this._categoryMaster.roomOccupied,
        roomStatus:this._categoryMaster.roomStatus,
      });
      this.CategoryMasterForm.controls["roomId"].disable();
      this.CategoryMasterForm.controls["roomNumber"].disable();
      this.CategoryMasterForm.controls["roomOccupied"].disable();
      this.CategoryMasterForm.controls["roomStatus"].disable();
      this.isProceess = false;
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.CategoryMasterForm = this.formBuilder.group({
 
      roomId :[''],
      roomNumber:[''],
      roomOccupied:[''],
      roomStatus:[''],
      
    });
  }


  onCancel() {
    this.isProceess = false;
    this.activeModal.dismiss();
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.CategoryMasterForm.controls[controlName].touched && this.CategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
