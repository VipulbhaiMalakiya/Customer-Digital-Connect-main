import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Subscription, delay, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-assigntome',
  templateUrl: './assigntome.component.html',
  styleUrls: ['./assigntome.component.css']
})
export class AssigntomeComponent {
  isProceess: boolean = true;
  userData: any;
  masterName?: any;
  data?: any;
  resolverData: any;
  subscription?: Subscription;
  pieChart = ChartType.PieChart;
  data1: any[] = [];
  width = 600;
  height = 400;
  title:any;
  ColumnChart = ChartType.ColumnChart

  columnNames = ['My Ticket', 'Assign to me'];
  options = {
    is3D: true,
  };
  donutOptions = {
    pieHole: 0.5
  }

  constructor(private titleService: Title,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private router: Router,) {
    this.titleService.setTitle("CDC - Dashboard");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit() {
    this.GetResolver();
  }



  GetResolver() {
    if (this.userData?.role?.roleName == 'Resolver') {
      this.masterName = `/ticket/resolver-assigned/statistics/${this.userData.userId}`;
    }
    this.isProceess = true;
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1))
      .subscribe(result => {
        this.resolverData = result;
        this.data1 = [];
        this.data1 = [];
        for (let row in result) {
          this.data1.push([
            result[row].name.toString(),
            result[row].total,
          ]);
        }
        this.isProceess = false;
        this.cd.detectChanges();
      }, error => {
        this.isProceess = false;
      })
  }
}
