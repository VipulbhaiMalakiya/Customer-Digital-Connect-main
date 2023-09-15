import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { analyticsMasterModel } from 'src/app/_models/analytics';
import { AppService } from 'src/app/_services/app.service';
import { performanceMasterModel } from 'src/app/_models/performance';

@Component({
  selector: 'app-agent-performance',
  templateUrl: './agent-performance.component.html',
  styleUrls: ['./agent-performance.component.css'],
})
export class AgentPerformanceComponent {
  isProceess: boolean = true;
  data: performanceMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  selectedValue?: any = 7;
  startDate?: any;
  endDate?: any;
  dateRangeError: boolean = false;
  totalRecord: any;
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
    var model: any = {
      startDate: this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),
    };
    this.masterName = `/agent-performance?startDate=${model.startDate}&endDate=${model.endDate}`;
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.data = data.data;
            this.count = this.data.length;
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  trackByFn(index: number, item: any): number {
    return item.categoryId;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onDownload() {
    const exportData = this.data.map((x) => {
      return {
        'User Name': x.user?.username || '',
        'Full Name': x.user?.firstName + ' ' + x.user?.lastName || '',
        Assigned: x?.assigned || '',
        Responded: x?.responded || '',
        'Rotal Resolved': x?.totalResolved || '',
        Reassigned: x?.reassigned || '',
        Closed: x?.closed || '',
        'First Response Time': x.firstResponseTime || '',
        'Avg Response Time': x.avgResponseTime || '',
        'Resolution Time': x.resolutionTime || '',
      };
    });
    const headers = [
      'User Name',
      'Full Name',
      'Assigned',
      'Responded',
      'Rotal Resolved',
      'Reassigned',
      'Closed',
      'First Response Time',
      'Avg Response Time',
      'Resolution Time',
    ];
    this.appService.exportAsExcelFile(exportData, 'Agent Performance', headers);
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
    var model: any = {
      startDate: this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),
    };
    this.masterName = `/agent-performance?startDate=${model.startDate}&endDate=${model.endDate}`;
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

  submitDateRange() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (start > end) {
      this.dateRangeError = true;
    } else {
      this.dateRangeError = false;
      var model: any = {
        startDate: this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
        endDate: this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),
      };
      this.masterName = `/agent-performance?startDate=${model.startDate}&endDate=${model.endDate}`;
      this.isProceess = true;

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
}
