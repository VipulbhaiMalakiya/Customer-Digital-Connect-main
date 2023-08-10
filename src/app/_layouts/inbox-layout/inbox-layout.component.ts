import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-inbox-layout',
  templateUrl: './inbox-layout.component.html',
  styleUrls: ['./inbox-layout.component.css'],
})
export class InboxLayoutComponent {
  classToggled = true;
  currentRoute: any;
  currentUrl: any;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/admin/inbox') {
          this.classToggled = true;
          this.cd.detectChanges();
        }  else if (event['url'] === '/inbox') {
          this.classToggled = true;
          this.cd.detectChanges();
        }
        else if (event['url'] === '/admin/inbox/:id') {
          this.classToggled = true;
          this.cd.detectChanges();
        }  else {
          this.cd.detectChanges();
          this.classToggled = false;
        }
      }
    });
  }

  openMenu() {
    this.classToggled = !this.classToggled;
  }
}
