import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.css']
})
export class ListWorkflowComponent {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {


  }

  refreshworkflow(){
    this.router.navigate(['/admin/workflow/create-workflow']);
  }
}
