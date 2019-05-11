import {Component, Input, OnInit} from '@angular/core';
import {NbAuthOAuth2Token, NbAuthService} from '@nebular/auth';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = {};

  userMenu = [{title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
              private http: HttpClient) {

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  ngOnInit(): void {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {
        if (token.isValid()) {
          const payload = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${payload.token_type} ${payload.access_token}`,
        };
          this.http.get('https://github-insights.eu.auth0.com/userinfo', { headers: headers})
            .subscribe((response) => this.user = response);
        }
    });
  }

}
