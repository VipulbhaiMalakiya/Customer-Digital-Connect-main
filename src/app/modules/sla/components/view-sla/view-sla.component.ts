import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { slaMasterModel } from 'src/app/_models/sla';

@Component({
  selector: 'app-view-sla',
  templateUrl: './view-sla.component.html',
  styleUrls: ['./view-sla.component.css']
})
export class ViewSlaComponent {
  private _serviceTitleMaster: slaMasterModel | undefined;
  data:any;

  set serviceTitleMaster(value: slaMasterModel) {
    this._serviceTitleMaster = value;
    this.data = value;
    console.log(this._serviceTitleMaster);
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {

  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
