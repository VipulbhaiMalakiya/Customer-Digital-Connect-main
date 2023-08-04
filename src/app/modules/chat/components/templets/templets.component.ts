import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-templets',
  templateUrl: './templets.component.html',
  styleUrls: ['./templets.component.css']
})
export class TempletsComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,) {




  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
