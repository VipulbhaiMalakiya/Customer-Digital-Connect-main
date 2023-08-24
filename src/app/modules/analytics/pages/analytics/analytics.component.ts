import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { labelMasterModel } from 'src/app/_models/labels';
import { AppService } from 'src/app/_services/app.service';
import { DatePipe } from '@angular/common';
import { analyticsMasterModel } from 'src/app/_models/analytics';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  isProceess: boolean = true;
  data: analyticsMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  selectedValue?: any = 7;
  startDate?: any;
  endDate?: any;
  dateRangeError: boolean = false;
  totalRecord:any;
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {
    this.titleService.setTitle('CDC -Analytics');
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);

    const oneWeekFromNow = new Date();
    this.endDate = this.datePipe.transform(
      oneWeekFromNow.toISOString().split('T')[0],
      'yyyy-MM-dd'
    );
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() - 7);
    this.startDate = this.datePipe.transform(
      oneWeekFromNow.toISOString().split('T')[0],
      'yyyy-MM-dd'
    );
  }

  ngOnInit(): void {
    this.fatchData();
  }
  trackByFn(index: number, item: any): number {
    return item.name;
  }
  fatchData() {
    this.isProceess = true;
    this.masterName = `/analytics-report?form=${this.datePipe.transform(
      this.startDate,
      'yyyy-MM-dd'
    )}&to=${this.datePipe.transform(this.endDate, 'yyyy-MM-dd')}`;
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data;
            this.totalRecord = this.data[0]?.total;
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  onDownload() {
    const exportData = this.data.map((x) => {
      return {
        Name: x.name || '',
        Total: x.total || '',
      };
    });
    const headers = ['Name', 'Total'];
    this.appService.exportAsExcelFile(
      exportData,
      'Conversation Analytics',
      headers
    );
  }

  onValueChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    const oneWeekFromNow = new Date();
    if (this.selectedValue === 'Today') {
      this.startDate = this.datePipe.transform(
        oneWeekFromNow.toISOString().split('T')[0],
        'yyyy-MM-dd'
      );
    } else if (this.selectedValue === 'Yesterday') {
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() - 1);
      this.startDate = this.datePipe.transform(
        oneWeekFromNow.toISOString().split('T')[0],
        'yyyy-MM-dd'
      );
    } else if (this.selectedValue === '7') {
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() - 7);
      this.startDate = this.datePipe.transform(
        oneWeekFromNow.toISOString().split('T')[0],
        'yyyy-MM-dd'
      );
    } else if (this.selectedValue === '30') {
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() - 30);
      this.startDate = this.datePipe.transform(
        oneWeekFromNow.toISOString().split('T')[0],
        'yyyy-MM-dd'
      );
    }

    this.isProceess = true;
    this.masterName = `/analytics-report?form=${this.datePipe.transform(
      this.startDate,
      'yyyy-MM-dd'
    )}&to=${this.datePipe.transform(this.endDate, 'yyyy-MM-dd')}`;
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data;
            this.totalRecord = this.data[0]?.total;
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  submitDateRange() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (start > end) {
      this.dateRangeError = true;
    } else {
      this.dateRangeError = false;
      var model: any = {
        form: this.datePipe.transform(start, 'yyyy-MM-dd'),
        to: this.datePipe.transform(end, 'yyyy-MM-dd'),
      };
      this.isProceess = true;
      this.masterName = `/analytics-report?form=${model.form}&to=${model.to}`;
      this.subscription = this.apiService
        .getAll(this.masterName)
        .pipe(take(1))
        .subscribe(
          (data) => {
            if (data) {
              this.data = data;
              this.totalRecord = this.data[0]?.total;
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
}
