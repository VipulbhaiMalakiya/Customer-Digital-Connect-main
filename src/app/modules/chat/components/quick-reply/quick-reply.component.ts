import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { quickrepliesModel } from 'src/app/_models/quickreplies';
import { AddEditeQuickReplayComponent } from 'src/app/modules/quick-replay/components/add-edite-quick-replay/add-edite-quick-replay.component';

@Component({
  selector: 'app-quick-reply',
  templateUrl: './quick-reply.component.html',
  styleUrls: ['./quick-reply.component.css']
})
export class QuickReplyComponent {
  isProceess: boolean = true;
  masterName?: any;
  quickReplydata:any = [];
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,) {
    this.fatchData();
  }

  fatchData(){
    this.masterName = '/quickreplies';
    this.apiService
     .getAll(this.masterName)
     .pipe(take(1))
     .subscribe(
       (data) => {
         if (data) {
           this.quickReplydata = data.data;
           this.isProceess = false;
           this.cd.detectChanges();
         }
       },
       (error) => {
         this.isProceess = false;
       }
     );
  }

  onAdd() {
    this.router.navigate(['/admin/master/quick-reply']);
    this.onCancel();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  sendMessage(i:any){
    this.activeModal.close(i)

  }
}
