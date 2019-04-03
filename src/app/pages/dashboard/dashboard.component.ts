import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as organisationService from '../../global-query';
import 'rxjs/add/operator/map';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  users: Array<any> = []; // List of Users
  organization: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }

  getReposNames(organization: String) {
    this.apollo.watchQuery({ query: organisationService.getReposNames, variables: {login: organization} })
      .valueChanges
      .map((result: any) => result.data.organizations).subscribe((data) => {
        this.organization = data;
        console.log(this.organization);
      })
  }

  onEnter(organization: String) { 
    this.getReposNames(organization);
  }

}


