import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-phone-no',
  templateUrl: './phone-no.component.html',
  styleUrls: ['./phone-no.component.css']
})
export class PhoneNoComponent  implements OnInit {
  customersMasterForm: any;
  selectedValue?: any = 0;
  currentDate?: any;
  defaultDate?: any;
  masterName?: any;
  time?:any = [];
  _customersMaster?:any = [];
  isProceess: boolean = false;
  set customersMaster(value: any) {
    this._customersMaster = value;
    this.time = this._customersMaster?.availableSlotTime;
    if (this._customersMaster) {
      this.customersMasterForm.patchValue({
        Date: this._customersMaster.slotDate,
        Person: this._customersMaster.numberOfPersons,
        Session: this._customersMaster.session,
        TimeSlots: this._customersMaster.availableSlotTime,
        // status:this._customersMaster.status
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    this.defaultDate = this.datePipe.transform(
      oneWeekFromNow.toISOString().split('T')[0],
      'yyyy-MM-dd'
    );
    const currentDateObj = new Date();
    this.currentDate = this.datePipe.transform(currentDateObj, 'yyyy-MM-dd');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    this.selectedValue = currentHour < 16 ? 'LUNCH' : 'DINNER';

    this.customersMasterForm = this.formBuilder.group({
      Date: [this.currentDate, [Validators.required]],
      Person: ['', [Validators.required]],
      Session: [, [Validators.required]],
      TimeSlots: ['', [Validators.required]],
      id:[''],
      // status:['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onRadioButtonClick(value: string): void {
    this.selectedValue = value;
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
  onSubmit() {
    if (this.customersMasterForm.valid) {
      this.activeModal.close(this.customersMasterForm.value)
    } else {
      this.customersMasterForm.controls['Date'].markAsTouched();
      this.customersMasterForm.controls['Person'].markAsTouched();
      this.customersMasterForm.controls['Session'].markAsTouched();
      this.customersMasterForm.controls['TimeSlots'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.customersMasterForm.controls[controlName].touched &&
      this.customersMasterForm.controls[controlName].hasError(errorName)
    );
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
