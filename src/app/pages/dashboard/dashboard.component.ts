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
  name: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }

  getReposLanguages(organization: String) {
    this.organization = null;
    this.apollo.watchQuery({ query: organisationService.getReposLanguages, variables: {login: organization} })
      .valueChanges
      .map((result: any) => result.data.Organization).subscribe((data) => {
        this.organization = data;
        console.log(this.organization);
      },
      error => {
        alert(error);
      }
      )
  }

  onEnter(organization: String) { 
    this.name = organization.charAt(0).toUpperCase() + organization.slice(1);
    this.getReposLanguages(organization);
  }

}


