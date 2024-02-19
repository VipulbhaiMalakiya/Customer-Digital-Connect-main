import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-activecustomerwithroomnumber',
  templateUrl: './activecustomerwithroomnumber.component.html',
  styleUrls: ['./activecustomerwithroomnumber.component.css']
})
export class ActivecustomerwithroomnumberComponent {
  isProceess: boolean = true;
  data: any[] = [];
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
  tableSize: number = 12;
  tableSizes: any = [3, 6, 9, 12];
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100, 500, 1000]; // Array of page size options
  currentPage: number = 1;
  totalItems: number = 0;
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private router: Router,

  ) {
    this.titleService.setTitle('CDC -Chat histroy Report');
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

    this.masterName = `/customer/activecustomerwithroomnumber`;
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.totalItems = data.totalRecords;
            this.data = data.data;
            console.log(this.data);
            
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

  onPageChange(page: number, pageSize: number): void {
    this.currentPage = page;
    this.pageSize = pageSize;
   this.fatchData();
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
        'guestName': x.guestName || '',
        'guestNumber': x.guestNumber || '',
        'guestCheckedInTime': x?.guestCheckedInTime || '',
        'roomNumber': x?.roomNumber || '',
    
      };
    });
    const headers = [
      'guestName',
      'guestNumber',
      'guestCheckedInTime',
      'roomNumber'

    ];
    this.appService.exportAsExcelFile(exportData, ' Active Customer Roomnumber', headers);
  }





}
