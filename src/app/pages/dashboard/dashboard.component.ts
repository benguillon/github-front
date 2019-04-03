import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import * as Query from '../../global-query';
import 'rxjs/add/operator/map';
import { SearchInputComponent } from '../../@theme/components';


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
    // this.getUsers();
  }

  getUsers() {
    this.apollo.watchQuery({ query: Query.Users })
      .valueChanges
      .map((result: any) => result.data.users).subscribe((data) => {
        this.users = data;
      })
  }

  onEnter(organization: string) { 
    this.organization = organization; 
  }

}


