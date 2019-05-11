import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-nb-oauth2-login',
  template: `
    <button class="btn btn-success" *ngIf="!token" (click)="login()">Sign In</button>
  `,
})
export class OAuth2LoginComponent implements OnDestroy {

  token: NbAuthOAuth2Token;

  alive = true;

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('auth0')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  logout() {
    this.authService.logout('auth0')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
