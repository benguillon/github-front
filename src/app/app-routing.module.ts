import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
} from '@nebular/auth';
import {OAuth2LoginComponent} from './@core/auth/oauth2-login.component';
import {OAuth2CallbackComponent} from './@core/auth/oauth2-callback.component';

const routes: Routes = [
  { path: '', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: OAuth2LoginComponent,
      },
    ],
  },
  {
    path: 'callback',
    component: OAuth2CallbackComponent,
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
