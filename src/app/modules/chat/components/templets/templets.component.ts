import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-templets',
  templateUrl: './templets.component.html',
  styleUrls: ['./templets.component.css']
})
export class TempletsComponent implements OnInit{
  isProceess: boolean = true;
  masterName?: any;
  templetsdata:any = [];
  templet:any = {};
  term: any;
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,) {
  }

  ngOnInit(): void {
    this.fatchData();
  }
  fatchData(){
    this.masterName = '/meta-templates';
    this.apiService
     .getAll(this.masterName)
     .pipe(take(1))
     .subscribe(
       (data) => {
         if (data) {
           this.templetsdata = data.data;
           this.templet = this.templetsdata[0];
           this.isProceess = false;
           this.cd.detectChanges();
         }
       },
       (error) => {
         this.isProceess = false;
       }
     );
  }

  onView(i:any){
    this.templet = i;
  }
  onCancel() {
    this.activeModal.dismiss();
  }
}
