import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { analyticsMasterModel } from 'src/app/_models/analytics';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-agent-performance',
  templateUrl: './agent-performance.component.html',
  styleUrls: ['./agent-performance.component.css']
})
export class AgentPerformanceComponent {
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
  term: any;
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
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {
    this.titleService.setTitle('CDC -Agent Performance');
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

  onTableDataChange(event: any) {
    this.page = event;
    this.fatchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fatchData();
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
      'Agent Performance',
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
