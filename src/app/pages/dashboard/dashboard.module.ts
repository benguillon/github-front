import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { EchartsPieComponent } from '../../components/charts/echarts-pie.component';
import { D3AdvancedPieComponent } from '../../components/charts/d3-advanced-pie.component';
import { TopStars } from '../../components/stars/top-stars.component';



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent, EchartsPieComponent, D3AdvancedPieComponent, TopStars],
})
export class DashboardModule { }
