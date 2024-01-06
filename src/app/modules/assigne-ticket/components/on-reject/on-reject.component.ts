import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-on-reject',
  templateUrl: './on-reject.component.html',
  styleUrls: ['./on-reject.component.css']
})
export class OnRejectComponent {
  customersMasterForm: any;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ){
    this.customersMasterForm = this.formBuilder.group({
      
      comment: ['', [Validators.required]],
    });
  
  }


  onSubmit() {
    if (this.customersMasterForm.valid) {
      this.activeModal.close(this.customersMasterForm.value)
    } else {
      this.customersMasterForm.controls['comment'].markAsTouched();
    }
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
