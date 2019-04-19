import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-stars',
  styleUrls: ['./top-stars.component.scss'],
  templateUrl: './top-stars.component.html',
})
export class TopStars implements OnDestroy {

  @Input()
  organization: any;

  members: any;
  reposMembers: any;

  private alive = true;

  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });


  }

  ngOnInit(){
    this.members = this.organization.members;
    this.getAllReposFromMembers();
    this.organization.repos.sort(this.sortNumber);
    this.reposMembers.sort(this.sortNumber);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getAllReposFromMembers() {
    this.reposMembers = [];
    this.members.forEach(member => {
      member.repos.forEach(repo => {
        repo.memberName = member.login;
        this.reposMembers.push(repo);
      });
    });
  }

  sortNumber(a, b) {
    return b.stars - a.stars;
  }


}
