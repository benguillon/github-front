import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import * as Query from '../../global-query';
import 'rxjs/add/operator/map';





@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  users: Array<any> = []; // List of Users

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

}


