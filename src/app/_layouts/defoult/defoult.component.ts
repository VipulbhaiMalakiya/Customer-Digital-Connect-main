import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-defoult',
  templateUrl: './defoult.component.html'
})
export class DefoultComponent implements OnInit {
  classToggled = true;
  currentRoute: any;
  currentUrl: any
  showHead: boolean = false;
  constructor(private router: Router,
    private cd: ChangeDetectorRef) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] === 'admin/inbox') {
            this.showHead = false;
            this.cd.detectChanges();
          } else {
            this.showHead = true;
            this.cd.detectChanges();
            this.classToggled = false
          }
        }
      });
  }
  ngOnInit(): void {
  }
  openMenu() {
    this.classToggled = !this.classToggled;
  }
}
