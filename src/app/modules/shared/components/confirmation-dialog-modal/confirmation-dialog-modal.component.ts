import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog-modal',
  templateUrl: './confirmation-dialog-modal.component.html'
})
export class ConfirmationDialogModalComponent implements OnInit {
  heading: string = '';
  message: string = '';
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.activeModal.close(false);
  }

  onConfirm() {
    this.activeModal.close(true);
  }
}
