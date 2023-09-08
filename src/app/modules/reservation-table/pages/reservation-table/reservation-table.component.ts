import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css'],
})
export class ReservationTableComponent implements OnInit {
  customersMasterForm: any;
  selectedValue?: any = 0;
  currentDate?: any;
  defaultDate?: any;
  masterName?: any;
  isProceess: boolean = true;

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
      Session: [this.selectedValue, [Validators.required]],
      TimeSlots: ['', [Validators.required]],
      FullName: [
        '',
        [
          Validators.required,
       ,

        noLeadingSpaceValidator()
         ,
        ],
      ],
      PhoneNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
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
      let data = {
        slotDate: this.customersMasterForm.value.Date,
        slotTime: this.customersMasterForm.value.TimeSlots,
        session: this.customersMasterForm.value.Session,
        customerName: this.customersMasterForm.value.FullName,
        customerMobile: `91${this.customersMasterForm.value.PhoneNo}`,
        numberOfGuests: this.customersMasterForm.value.Person,
      };

      this.masterName = `/reservation`;
      let addData: any = {
        url: this.masterName,
        model: data,
      };
      this.isProceess = true;
      this.apiService
        .add(addData)
        .pipe(take(1))
        .subscribe(
          (response) => {
            this.isProceess = false;
            this.toastr.success(response.message);
            this.router.navigate(['/admin/orders']);
          },
          (error) => {
            this.isProceess = false;
            this.toastr.error(error.error.message);
          }
        );
    } else {
      this.customersMasterForm.controls['Date'].markAsTouched();
      this.customersMasterForm.controls['Person'].markAsTouched();
      this.customersMasterForm.controls['Session'].markAsTouched();
      this.customersMasterForm.controls['TimeSlots'].markAsTouched();
      this.customersMasterForm.controls['FullName'].markAsTouched();
      this.customersMasterForm.controls['PhoneNo'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.customersMasterForm.controls[controlName].touched &&
      this.customersMasterForm.controls[controlName].hasError(errorName)
    );
  }
}
