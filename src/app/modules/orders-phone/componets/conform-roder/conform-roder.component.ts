import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conform-roder',
  templateUrl: './conform-roder.component.html',
  styleUrls: ['./conform-roder.component.css']
})
export class ConformRoderComponent {
  isProceess: boolean = false;
  customersMasterForm: any;
  data: any;
  private _issueMaster: any;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.customersMasterForm = this.formBuilder.group({
      Payment: ['CreditCard', [Validators.required]],
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
      this.customersMasterForm.controls['Payment'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
