import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phone-no',
  templateUrl: './phone-no.component.html',
  styleUrls: ['./phone-no.component.css']
})
export class PhoneNoComponent  {
  isProceess: boolean = false;
  customersMasterForm: any;
  data: any;



  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.customersMasterForm = this.formBuilder.group({
      contact: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
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
    if (this.customersMasterForm.valid) {
      this.activeModal.close(this.customersMasterForm.value)
    } else {
      this.customersMasterForm.controls['contact'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
