import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { prodactCategoryMasterModel } from 'src/app/_models/prodact_category';

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.css']
})
export class ViewProductCategoryComponent {
  isProceess: boolean = false;
  data:any;
  imageLoaded = false;


  set prodactCatMaster(value: prodactCategoryMasterModel) {
    this.data = value;
    console.log(this.data);

  }

  constructor(
    private activeModal: NgbActiveModal) {
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
