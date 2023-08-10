import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { labelMasterModel } from 'src/app/_models/labels';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {


  isProceess: boolean = true;
  term: any;
  data: any[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService
  ) {
    this.titleService.setTitle('CDC -Analytics');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName ='/label/active'
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data.data;
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }
}
