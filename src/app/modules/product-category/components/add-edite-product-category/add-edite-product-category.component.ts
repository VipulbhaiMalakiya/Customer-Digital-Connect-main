import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { imageExtensionValidator } from 'src/app/_helpers/image-extension.validator';
import { prodactCategoryMasterModel } from 'src/app/_models/prodact_category';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-product-category',
  templateUrl: './add-edite-product-category.component.html',
  styleUrls: ['./add-edite-product-category.component.css']
})
export class AddEditeProductCategoryComponent {
  isProceess: boolean = true;
  customersMasterForm: any;
  uploadFile: any = "";
  check: any
  imageLoaded = false;
  imageURL: any = '../../../../../assets/images/default-nopic.jpg';
  previewUrl: any;


  private _procatMaster: prodactCategoryMasterModel | undefined;

  get title(): string {
    return this._procatMaster ? "Edit product category Master" : " Add product category Master";
  }
  set prodactCatMaster(value: prodactCategoryMasterModel) {
    this.check = value;
    this._procatMaster = value;
    if (this._procatMaster) {
      this.customersMasterForm.patchValue({
        productCategoryName: this._procatMaster.productCategoryName,
        productCategoryDescription: this._procatMaster.productCategoryDescription,
        status: this._procatMaster.status,
      });
      if (this._procatMaster.fileUrl !== null) {
        this.imageURL = this._procatMaster.fileUrl;
        this.cd.detectChanges();
      }
      else {
        this.imageURL = '../../../../../assets/images/default-nopic.jpg';
        this.cd.detectChanges();
      }
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.isProceess = false;

    this.customersMasterForm = this.formBuilder.group({
      productCategoryName: ["", [
        Validators.required,

        noLeadingSpaceValidator(),
        ]],
      productCategoryDescription: ['', [Validators.required, noLeadingSpaceValidator()]],
      status: [true, [Validators.required]],
      file: [''],
      image: ['']
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  onFileChange(event: any) {

    const file = event.target.files[0];
    this.customersMasterForm.get('image').setValue(file);
    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);

    let data;
    if (event.target.files && event.target.files[0])
      data = event.target.files[0];
    if (event.target.files[0].name && event.target.files.length > 0) {
      data = event.target.files[0];
    }
    else {
      data = "null"
    }
    this.uploadFile = data;
  }

  onSubmit() {
    if (this.customersMasterForm.valid) {
      let data = {
        productCategoryName: this.customersMasterForm.value.productCategoryName,
        productCategoryDescription: this.customersMasterForm.value.productCategoryDescription,
        status: this.customersMasterForm.value.status,
        file: this.uploadFile || null,
      }
      this.activeModal.close(data)
    } else {
      this.customersMasterForm.controls['productCategoryName'].markAsTouched();
      this.customersMasterForm.controls['productCategoryDescription'].markAsTouched();
      this.customersMasterForm.controls['status'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
