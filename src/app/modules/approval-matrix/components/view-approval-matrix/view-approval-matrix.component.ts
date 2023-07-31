import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-approval-matrix',
  templateUrl: './view-approval-matrix.component.html'
})
export class ViewApprovalMatrixComponent {

  isProceess:boolean= true;
  constructor(private activeModal: NgbActiveModal) { }

  onCancel() {
    this.activeModal.close(false);
  }

}
