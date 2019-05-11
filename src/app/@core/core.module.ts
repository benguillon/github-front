import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import {OAuth2LoginComponent} from './auth/oauth2-login.component';
import {OAuth2CallbackComponent} from './auth/oauth2-callback.component';
import {NbLayoutModule} from '@nebular/theme';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbOAuth2AuthStrategy.setup({
        name: 'auth0',
        clientId: 'prBJrBJQp4tyEUseCpiBWMqs3hO-e8r5',
        clientSecret: 'R1yTpATU6_xEXaxhpQg4YsRWgSCBjJSQcU-z-7gnU1ReJiG8iihKcedNAiwKtebC',
        authorize: {
          endpoint: 'https://github-insights.eu.auth0.com/authorize',
          responseType: NbOAuth2ResponseType.TOKEN,
          scope: 'openid profile',
          redirectUri: 'http://localhost:4200/callback',
        },
      }),
    ],
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [
  OAuth2LoginComponent,
  OAuth2CallbackComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
