import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as organisationService from '../../global-query';
import 'rxjs/add/operator/map';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  organization: any;
  name: any;

  loading = false;

  summary: any;

  constructor(private apollo: Apollo) {
  }

  getReposLanguages(organization: String) {
    this.organization = null;
    this.apollo.watchQuery({ query: organisationService.getReposLanguages, variables: {login: organization} })
      .valueChanges
      .map((result: any) => result.data.Organization).subscribe((data) => {
        this.organization = data;
        this.getStats();
        this.loading = false;
      },
      error => {
        alert(error);
        this.loading = false;
      },
      );
  }

  onEnter(organization: String) {
    this.name = organization.charAt(0).toUpperCase() + organization.slice(1);
    this.loading = true;
    this.getReposLanguages(organization);
  }

  getStats(){
    var nbRepos = 0;
    var nbLangages = 0;
    var nbMembers = 0;
    const languages = {};
    this.organization.repos.forEach(function(repo) {
      nbRepos++;
      repo.languages.forEach(function(language) {
        console.log('Languages name : ' + language.name);
        if (languages.hasOwnProperty(language.name)) {
          languages[language.name]++;
        } else {
          languages[language.name] = 1;
          nbLangages++;
        }
      });
    });
    for(var member in this.organization.members){
      nbMembers++;
    }
    this.summary = [];
    this.summary.push({title: "Repositories", value: nbRepos});
    this.summary.push({title: "Membres", value: nbMembers});
    this.summary.push({title: "Langages", value: nbLangages});
  }

}


