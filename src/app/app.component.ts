import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'avataara';
  constructor(private authenticationService: AuthenticationService,
    private router: Router,) {

  }
}
