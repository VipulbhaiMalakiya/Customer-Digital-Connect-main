import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-inbox-layout',
  templateUrl: './inbox-layout.component.html',
  styleUrls: ['./inbox-layout.component.css'],
})
export class InboxLayoutComponent {
  classToggled = false;
  currentRoute: any;
  currentUrl: any;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/admin/inbox' || event['url'] === '/inbox') {
          this.classToggled = true;
          this.cd.detectChanges();
        } else if (event['url'].startsWith('/admin/inbox/')) {
          this.classToggled = true;
          this.cd.detectChanges();
        } else {
          this.cd.detectChanges();
          this.classToggled = false;
        }
      }
    });

    if (this.router.url === '/admin/inbox') {
      this.classToggled = true;
    } else if (this.router.url === '/inbox') {
      this.classToggled = true;
    } else if (this.router.url === '/admin/inbox/id') {
      this.classToggled = true;
    }
  }

  openMenu() {
    this.classToggled = !this.classToggled;
  }
}
