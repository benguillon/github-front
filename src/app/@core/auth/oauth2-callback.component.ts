import {Component, OnDestroy} from '@angular/core';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'ngx-nb-playground-oauth2-callback',
  template: `
    <nb-layout>
      <nb-layout-column>Authenticating...</nb-layout-column>
    </nb-layout>
  `,
})
export class OAuth2CallbackComponent implements OnDestroy {

  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('auth0').pipe(takeWhile(() => this.alive)).subscribe((authResult: NbAuthResult) => {
      if (authResult.isSuccess() && authResult.getRedirect()) {
        this.router.navigateByUrl(authResult.getRedirect());
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
