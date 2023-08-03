import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { prodactMasterModel } from 'src/app/_models/prodact';
import { AddOrderComponent } from '../../componet/add-order/add-order.component';
import { CartService } from 'src/app/_api/masters/cart.service';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ConformOrderComponent } from '../../componet/conform-order/conform-order.component';
import { PhoneNoComponent } from '../../componet/phone-no/phone-no.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isProceess: boolean = true;
  masterName?: any;
  cartItems?: any = [];
  prodactCategory: any = [];
  customersMasterForm: any;
  phoneNumber?:any = [];
  prodact: prodactMasterModel[] = [];
  userData: any;
  categroyName?: any = '';
  public isLoading = true;
  discount: number = 0;
  tableId: number = 0;
  tblno : number = 0
  isprodact: boolean = false;
  mobileno: number = 0;
  tdata:any = [];
  lsolt:any = [];
  dslot:any = [];
  istable: boolean = true;
  reservationData?:any= [];
  constructor(
    private titleService: Title,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private cartService: CartService,
    public masterAPI: TickitService
  ) {
    this.titleService.setTitle('CDC - Order');
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
    });
  }
  ngOnInit(): void {
    this.getCategory();
    this.isprodact = false;
    this.getCartItems();
    this.getTable();
  }
  onReservationList(){
    this.getreservation();
  }
  getTable(){
    this.isProceess = true;
    this.masterName = '/restaurent-table/table/slot';
    this.apiService.getAll(this.masterName).subscribe((data) => {
      this.tdata = data.data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }
  getreservation() {
    this.isProceess = true;
    this.masterName = '/reservation';
    this.apiService.getAll(this.masterName).subscribe((data) => {
      this.reservationData = data.data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  onTable() {
    this.router.navigate(['/admin/reservation-table']);
  }
  calculateGrandTotal() {
    let grandTotal = 0;
    for (const item of this.cartItems) {
      grandTotal += item.total;
    }
    return grandTotal;
  }

  getSubtotal(): number {
    let subtotal = 0;
    for (const item of this.cartItems) {
      subtotal += item.price * item.quantity;
    }
    return subtotal;
  }

  onImageLoad() {
    this.isLoading = false;
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
  getCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }
  getCategory() {
    this.isProceess = true;
    this.masterName = '/productCategory/active';
    this.apiService.getAll(this.masterName).subscribe((data) => {
      this.prodactCategory = data.data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  Getcategory() {
    this.isprodact = false;
    this.categroyName = '';
  }
  GetProdact(i: any) {
    this.isProceess = true;
    this.categroyName = i.productCategoryName;
    this.masterName = `/product/active/productCategoryId/${i.productCategoryId}`;
    this.apiService.getAll(this.masterName).subscribe((data) => {
      this.prodact = data.data;
      this.isprodact = true;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }

  addToCart(dataItem: any) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddOrderComponent, { size: 'md' });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddOrderComponent;
    componentInstance.prodactMaster = dataItem;

    modalRef.result
      .then((data: any): void => {
        let price: number = 0;
        if (data.Option == '250 GM') {
          price = dataItem.productPrices.GM250Price;
        } else if (data.Option == '500 GM') {
          price = dataItem.productPrices.GM500Price;
        } else if (data.Option == '1 KG') {
          price = dataItem.productPrices.KG1Price;
        } else if (data.Option == '1LT') {
          price = dataItem.productPrices.lt1price;
        } else if (data.Option == 'Piece') {
          price = dataItem.productPrices.PiecePrice;
          ``;
        }
        if (data) {
          var model: any = {
            unitofmeasure: data.Option,
            productId: dataItem.productId,
            productName: dataItem.productName,
            quantity: data.Qty,
            price: price,
            total: price * data.Qty,
            file: dataItem.fileUrl,
          };
          this.cartService.addToCart(model);
          this.getCartItems();
          this.toastr.success('Add new product', 'Success');
        }
      })
      .catch(() => {});
  }

  onDelete(index: number) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = 'Are you sure you want to delete this prodact?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.cartService.removeFromCart(index);

          this.toastr.success('Product removed from cart.', 'Success');
          this.getCartItems();
        }
      })
      .catch(() => {});
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
    window.location.reload();
  }

  tableSelect(i: any) {
    this.tableId = i.resiorvationId;
    this.tblno = i.tableNumber;
    this.mobileno = i.phoneNumber
    this.istable = false;

  }

  tableedite(i: any){
    this.isProceess = true;
    const modalRef = this.modalService.open(PhoneNoComponent, { size: 'md' });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as PhoneNoComponent;
    componentInstance.customersMaster = i;
    modalRef.result
      .then((data: any) => {
        if (data) {
          let model: any = {
            reservationId:i?.resiorvationId,
            slotDate:data.Date,
            slotTime:data.TimeSlots,
            session:data.Session,
            numberOfGuests:data.Person,
            status:data.status

          };
          this.masterName = `/reservation/rescheduleReservation`;
          let updateData: any = {
            url: this.masterName,
            model: model,
          };
          this.isProceess = true;
          this.isProceess = true;
           this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
            this.toastr.success(res.message);
            this.isProceess = false;
            this.getreservation();
            this.getTable();
          }, error => {
            this.toastr.error(error.error.message);
            this.isProceess = false;
          });
        }
      })
      .catch(() => {});
  }

  tabledelete(i:any){
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to reservation cancel?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/reservation/cancelReservation/resiorvationId/${i?.resiorvationId}`;
        let updateData: any = {
          url: this.masterName
        }
        this.isProceess = true;
        this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.getreservation();
          this.getTable();
        }, error => {
          this.toastr.error(error.message);
          this.isProceess = false;
        });

      }
    }).catch(() => { });
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConformOrderComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result
      .then((data: any) => {
        if (data) {
          let model: any = {
            customerMob: this.mobileno,
            reservationId: this.tableId,
            createdBy: this.userData.userId,
            discount: this.discount,
            subtotal: this.calculateGrandTotal(),
            cgst: this.getCGST(),
            sgst: this.getSGST(),
            service: this.getservice(),
            totaltax: this.getTotalTaxAmount(),
            grand: this.getGrandTotal(),
            paymentType: data.Payment,
            status: true,
            orderDetails: this.cartItems,
          };

          this.masterName = `/order`;
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
                localStorage.removeItem('cartItems');
                this.cartItems = [];
                if (res.status === 'Success') {
                  this.toastr.success(res.message);
                  this.isProceess = false;
                  this.router.navigate(['/admin/ordersList']);
                  // this.masterAPI.downloadInvoice(res.data?.orderId);
                }
              },
              (error) => {
                if (error.error.status === 'failed') {
                  this.isProceess = false;
                  this.toastr.error(error.error.message);
                }
              }
            );
        }
      })
      .catch(() => {});
  }
}
