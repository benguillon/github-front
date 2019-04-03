import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { EchartsPieComponent } from '../../components/echarts/echarts-pie.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule
  ],
  declarations: [
    DashboardComponent, EchartsPieComponent  ],
})
export class DashboardModule { }
