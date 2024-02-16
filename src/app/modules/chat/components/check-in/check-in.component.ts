import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {
  private _issueMaster: any | undefined;
  isProceess: boolean = false;
  data: any;
  issueForm: any;
  _labelsMaster: any ;

  subscription?: Subscription;
  masterName?: any;

  get title(): string {
    return this._issueMaster ? "Edit Issue Master" : "Check In";
  }


  set customersMaster(value: any) {

    this._labelsMaster = value;
    this.data = value;
    if (this._labelsMaster) {
      this.issueForm.patchValue({
        guestName: this._labelsMaster.fullName,
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,


  ) {
    this.issueForm = this.formBuilder.group({
      guestName: ["", [Validators.required,]],
      roomNumber: ['', [Validators.required,this.positiveNumberValidator]],
      numberoGuiest: ['', [Validators.required]],
    });
    this.fatchData();
  }

  positiveNumberValidator(control:any) {
    const value = control.value;
    if (value <= 0 || isNaN(value)) {
      return { 'positiveNumber': true };
    }
    return null;
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/rooms/available-rooms";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.isProceess = false;
        this.cd.detectChanges();
      }

    }, error => {
      this.isProceess = false;
    })
  }
  onCancel() {
    this.activeModal.dismiss();
  }


  onSubmit() {
    if (this.issueForm.valid) {
      this.activeModal.close(this.issueForm.value)
    } else {
      this.issueForm.controls['guestName'].markAsTouched();
      this.issueForm.controls['roomNumber'].markAsTouched();
      this.issueForm.controls['numberoGuiest'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.issueForm.controls[controlName].touched && this.issueForm.controls[controlName].hasError(errorName);
  }
}
