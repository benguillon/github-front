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

  ngOnDestroy() {
    this.alive = false;
  }

  sortReposStars(){
    
  }
}
