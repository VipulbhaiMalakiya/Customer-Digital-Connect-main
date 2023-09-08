import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { prodactMasterModel } from 'src/app/_models/prodact';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  isProceess: boolean = false;
  customersMasterForm: any;
  uploadFile: any = '';
  check: any;
  checkboxValue: boolean = false;
  prodactCategory: any;
  imageURL: any = '../../../../../assets/images/default-nopic.jpg';
  previewUrl: any;
  masterName?: any;

  private _procatMaster: prodactMasterModel | undefined;
  get title(): string {
    return this._procatMaster
      ? 'Edit Prodact  Master'
      : ' Add  Category Master';
  }
  set prodactMaster(value: prodactMasterModel) {
    this.check = value;
    this._procatMaster = value;
    if (this._procatMaster) {
      this.customersMasterForm.patchValue({
        ProductName: this._procatMaster.productName,
        status: this._procatMaster.status,
        ProductSerialNo: this._procatMaster.serialNo,
        CategoryName: this._procatMaster.productCategory.productCategoryId,
        radioOption: this._procatMaster.options,
        checkbox250GM: this._procatMaster.ischeckboxGM250,
        checkbox500GM: this._procatMaster.ischeckboxGM500,
        checkbox1KG: this._procatMaster.ischeckboxKG1,
        GM250Price: this._procatMaster.productPrices?.GM250Price,
        GM500Price: this._procatMaster.productPrices?.GM500Price,
        KG1Price: this._procatMaster.productPrices?.KG1Price,
        ProductDescription: this._procatMaster?.productDescription,
        PiecePrice: this._procatMaster.productPrices?.PiecePrice,
        checkboxPiece: this._procatMaster.ischeckboxPiece,
        checkbox1LT: this._procatMaster.ischeckboxLT1,
        LT1Price: this._procatMaster.productPrices?.lt1price,
      });
      this.customersMasterForm.controls['ProductName'].disable();
      this.customersMasterForm.controls['status'].disable();
      this.customersMasterForm.controls['ProductSerialNo'].disable();
      this.customersMasterForm.controls['CategoryName'].disable();
      this.customersMasterForm.controls['radioOption'].disable();
      this.customersMasterForm.controls['checkbox250GM'].disable();
      this.customersMasterForm.controls['checkbox500GM'].disable();
      this.customersMasterForm.controls['checkbox1KG'].disable();
      this.customersMasterForm.controls['GM250Price'].disable();
      this.customersMasterForm.controls['GM500Price'].disable();
      this.customersMasterForm.controls['KG1Price'].disable();
      this.customersMasterForm.controls['ProductDescription'].disable();
      this.customersMasterForm.controls['PiecePrice'].disable();
      this.customersMasterForm.controls['checkboxPiece'].disable();
      this.customersMasterForm.controls['checkbox1LT'].disable();
      this.customersMasterForm.controls['LT1Price'].disable();
      if (this._procatMaster.fileUrl !== null) {
        this.imageURL = this._procatMaster.fileUrl;
        this.cd.detectChanges();
      } else {
        this.imageURL = '../../../../../assets/images/default-nopic.jpg';
        this.cd.detectChanges();
      }
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {
    this.customersMasterForm = this.formBuilder.group({
      CategoryName: ['', [Validators.required]],
      ProductName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          noLeadingSpaceValidator(),

          Validators.pattern('^(?!\\s*$)[a-zA-Z\\s]*$'),
        ],
      ],
      ProductSerialNo: ['', [Validators.required]],
      status: [true, [Validators.required]],
      ProductDescription: ['', [Validators.required, noLeadingSpaceValidator()]],
      file: [''],
      image: [''],
      radioOption: ['PIECE', Validators.required],
      checkboxPiece: [false],
      checkbox250GM: [false],
      GM250Price: [''],
      GM500Price: [''],
      KG1Price: [''],
      LT1Price: [''],
      checkbox500GM: [false],
      checkbox1KG: [false],
      checkbox1LT: [false],
      PiecePrice: [''],
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.masterName = '/productCategory/active';
    this.apiService.getAll(this.masterName).subscribe((data) => {
      this.prodactCategory = data.data;
      this.isProceess = false;
      this.cd.detectChanges();
    });
  }
  handleCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (!isChecked) {
      this.customersMasterForm.get('PiecePrice').setValue('');
    }
  }
  handleCheckboxChange250GM(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (!isChecked) {
      this.customersMasterForm.get('GM250Price').setValue('');
    }
  }
  handleCheckboxChange500GM(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (!isChecked) {
      this.customersMasterForm.get('GM500Price').setValue('');
    }
  }
  handleCheckboxChange1KG(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (!isChecked) {
      this.customersMasterForm.get('KG1Price').setValue('');
    }
  }
  handleCheckboxChange1LT(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (!isChecked) {
      this.customersMasterForm.get('checkbox1LT').setValue('');
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

  onCancel() {
    this.activeModal.dismiss();
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.customersMasterForm.controls[controlName].touched &&
      this.customersMasterForm.controls[controlName].hasError(errorName)
    );
  }

  /**
   * The onReset function resets the customersMasterForm.
   */
  onReset() {
    this.customersMasterForm.reset();
  }
}
