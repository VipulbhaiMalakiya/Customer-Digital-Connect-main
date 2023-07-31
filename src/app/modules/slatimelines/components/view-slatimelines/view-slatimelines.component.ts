import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SLATimelinesMasterModel } from 'src/app/_models/SLA-Timelines';

@Component({
  selector: 'app-view-slatimelines',
  templateUrl: './view-slatimelines.component.html',
  styleUrls: ['./view-slatimelines.component.css']
})
export class ViewSlatimelinesComponent {
  private _SLATimelinesMaster: SLATimelinesMasterModel | undefined;
  isProceess: boolean = false;
  SLATimelinesMasterForm: any;

  get title(): string {
    return this._SLATimelinesMaster ? "Edit SLA Timelines Master" : " Add SLA Timelines Master";
  }
  set slaMaster(value: SLATimelinesMasterModel) {
    this._SLATimelinesMaster = value;
    let updatedBy:any = ' '
    if(this._SLATimelinesMaster.updatedBy?.firstName  != undefined ){
      updatedBy = this._SLATimelinesMaster.updatedBy?.firstName + ' ' + this._SLATimelinesMaster.updatedBy?.lastName
    }
    else{
      updatedBy = ''
    }
    if (this._SLATimelinesMaster) {
      this.SLATimelinesMasterForm.patchValue({
        priorityName:this._SLATimelinesMaster.priorityName,
        slaTimeInHours:this._SLATimelinesMaster.slaTimeInHours,
        status:this._SLATimelinesMaster.status,
        id:this._SLATimelinesMaster.id,
        createdDate: moment(this._SLATimelinesMaster.createdDate || '').format("llll"),
        createdBy:this._SLATimelinesMaster.createdBy?.firstName + ' ' + this._SLATimelinesMaster.createdBy?.lastName,
        updatedDate:  moment(this._SLATimelinesMaster.updatedDate || '').format("llll"),
        updatedBy:updatedBy,
      });
      this.SLATimelinesMasterForm.controls["priorityName"].disable();
      this.SLATimelinesMasterForm.controls["slaTimeInHours"].disable();
      this.SLATimelinesMasterForm.controls["status"].disable();
      this.SLATimelinesMasterForm.controls["id"].disable();
      this.SLATimelinesMasterForm.controls["createdDate"].disable();
      this.SLATimelinesMasterForm.controls["createdBy"].disable();
      this.SLATimelinesMasterForm.controls["updatedDate"].disable();
      this.SLATimelinesMasterForm.controls["updatedBy"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.SLATimelinesMasterForm = this.formBuilder.group({
      priorityName:["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]],
      slaTimeInHours: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]],
        status: ['', [Validators.required]],
        id:[''],
        createdDate:[''],
        createdBy:[''],
        updatedDate:[''],
        updatedBy:['']
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
