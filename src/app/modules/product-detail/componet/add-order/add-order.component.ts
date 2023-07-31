import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/_api/masters/cart.service';
import { prodactMasterModel } from 'src/app/_models/prodact';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit{
  isProceess: boolean = false;
  departmentMasterForm: any;
  check: any;
  set prodactMaster(value: prodactMasterModel) {
    this.check = value;
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {
    this.departmentMasterForm = this.formBuilder.group({
      Qty: ['', [Validators.required,Validators.maxLength(5)]],
      Option: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.departmentMasterForm.valid) {
      this.activeModal.close(this.departmentMasterForm.value)
    } else {
      this.departmentMasterForm.controls['Qty'].markAsTouched();
      this.departmentMasterForm.controls['Option'].markAsTouched();
    }
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

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.departmentMasterForm.controls[controlName].touched &&
      this.departmentMasterForm.controls[controlName].hasError(errorName)
    );
  }
}
