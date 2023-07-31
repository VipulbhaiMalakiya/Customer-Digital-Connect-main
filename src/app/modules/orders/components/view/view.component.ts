import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CartService } from 'src/app/_api/masters/cart.service';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { orderMasterModel } from 'src/app/_models/order';
import { prodactMasterModel } from 'src/app/_models/prodact';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  private _orderMaster: orderMasterModel | undefined;
  isProceess: boolean = false;
  data?: any;
  orderDetails?: any = [];
  discount: number = 0;
  masterName?: any;
  cartItems?: any = [];
  prodactCategory: any = [];
  customersMasterForm: any;
  prodact: prodactMasterModel[] = [];
  userData: any;
  categroyName?: any = '';
  public isLoading = true;
  isprodact: boolean = false;

  set editeData(value: orderMasterModel) {
    this._orderMaster = value;
    this.data = value;
    console.log(this.data);

    this.orderDetails = this.data?.orderDetails;
    this.discount = this.data.discount;
    if (this._orderMaster) {
      this.customersMasterForm.patchValue({
        contact: this._orderMaster?.customer?.contact,
        Payment: this._orderMaster.paymentType,
      });
      this.customersMasterForm.controls["contact"].disable();
      this.customersMasterForm.controls["Payment"].disable();

    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cartService: CartService,
    public masterAPI: TickitService
  ) {
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);

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
      Payment: ['CreditCard', [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  getSubtotal(): number {
    let subtotal = 0;
    for (const item of this.orderDetails) {
      subtotal += item.price * item.quantity;
    }
    return subtotal;
  }

  calculateGrandTotal() {
    let grandTotal = 0;
    for (const item of this.orderDetails) {
      grandTotal += item.total;
    }
    return grandTotal;
  }

  getCGST(): number {
    const cgstRate = 0.01; // Assuming 1% CGST rate
    return this.getSubtotal() * cgstRate;
  }

  getservice(): number {
    const serviceRate = 0.01; // Assuming 1% service rate
    return this.getSubtotal() * serviceRate;
  }

  getSGST(): number {
    const sgstRate = 0.01; // Assuming 1% SGST rate
    return this.getSubtotal() * sgstRate;
  }

  getTotalTaxAmount(): number {
    return this.getCGST() + this.getSGST() + this.getservice();
  }

  getDiscount(): number {
    const totalAmount = this.calculateGrandTotal() + this.getTotalTaxAmount();
    return (totalAmount * this.discount) / 100;
  }

  getGrandTotal(): number {
    const total = this.getSubtotal() + this.getTotalTaxAmount();
    return total - this.getDiscount();
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
      this.customersMasterForm.controls[controlName].touched &&
      this.customersMasterForm.controls[controlName].hasError(errorName)
    );
  }

  onReset() {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
  }
  onSubmit() {
    if (this.customersMasterForm.valid) {
      let model: any = {
        customerMob: this.customersMasterForm.value.contact,
        updatedBy: this.userData.userId,
        discount: this.discount,
        subtotal: this.calculateGrandTotal(),
        cgst: this.getCGST(),
        sgst: this.getSGST(),
        service: this.getservice(),
        totaltax: this.getTotalTaxAmount(),
        grand: this.getGrandTotal(),
        paymentType: this.customersMasterForm.value.Payment,
        status: true,
        orderDetails: this.cartItems,
      };
      this.masterName = `/order/${this.data.orderId}`;
      let addData: any = {
        url: this.masterName,
        model: model,
      };
      this.isProceess = true;
      this.apiService
        .add(addData)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.onReset();
            if (res.status === 'Success') {
              this.toastr.success(res.message);
              this.isProceess = false;
              this.router.navigate(['/admin/ordersList']);
              this.masterAPI.downloadInvoice(res.data.orderId);
            }
          },
          (error) => {
            if (error.error.status === 'failed') {
              this.isProceess = false;
              this.toastr.error(error.error.message);
            }
          }
        );
    } else {
      this.customersMasterForm.controls['contact'].markAsTouched();
      this.customersMasterForm.controls['Payment'].markAsTouched();

    }
  }
}
