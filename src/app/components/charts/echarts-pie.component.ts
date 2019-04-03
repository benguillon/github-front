import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { elementEnd } from '@angular/core/src/render3';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  @Input()
  organization: any;

  languages: [];

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Java', 'Javascript', 'Python', 'PHP'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Langages',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 34, name: 'Java' },
              { value: 16, name: 'Javascript' },
              { value: 9, name: 'Python' },
              { value: 7, name: 'PHP' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  
  getNbReposPerLanguages(organization: any){
    this.organization.data.forEach(orgaElement => {
      this.languages.forEach(langElement => {
      });
    });
  }

}
