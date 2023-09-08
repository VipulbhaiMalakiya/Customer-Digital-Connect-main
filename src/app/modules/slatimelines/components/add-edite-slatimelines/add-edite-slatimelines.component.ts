import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SLATimelinesMasterModel } from 'src/app/_models/SLA-Timelines';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-slatimelines',
  templateUrl: './add-edite-slatimelines.component.html',
  styleUrls: ['./add-edite-slatimelines.component.css']
})
export class AddEditeSlatimelinesComponent {
  private _SLATimelinesMaster: SLATimelinesMasterModel | undefined;
  isProceess: boolean = false;
  SLATimelinesMasterForm: any;
  data:any;

  get title(): string {
    return this._SLATimelinesMaster ? "Edit SLA Timelines Master" : " Add SLA Timelines Master";
  }

  set slaMaster(value: SLATimelinesMasterModel) {
    this._SLATimelinesMaster = value;
    this.data = value;
    if (this._SLATimelinesMaster) {
      this.SLATimelinesMasterForm.patchValue({
        priorityName:this._SLATimelinesMaster.priorityName,
        slaTimeInHours:this._SLATimelinesMaster.slaTimeInHours,
        status:this._SLATimelinesMaster.status,

      });
      this.isProceess = false;
      // this.rolesPermissionsMasterForm.controls["email"].disable();
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
        noLeadingSpaceValidator(),
        ]],
      slaTimeInHours: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]],
        status: [true, [Validators.required]]
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const input = event.key;

    if (!allowedKeys.includes(input) && isNaN(parseInt(input, 10))) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.SLATimelinesMasterForm.valid) {
      this.activeModal.close(this.SLATimelinesMasterForm.value)
    } else {
      this.SLATimelinesMasterForm.controls['priorityName'].markAsTouched();
      this.SLATimelinesMasterForm.controls['slaTimeInHours'].markAsTouched();
      this.SLATimelinesMasterForm.controls['status'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.SLATimelinesMasterForm.controls[controlName].touched && this.SLATimelinesMasterForm.controls[controlName].hasError(errorName);
  }
}
