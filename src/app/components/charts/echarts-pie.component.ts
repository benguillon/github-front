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
  // Compteur des langages
  listLanguages: any;
  languages: any;
  // Objet crée pour le graph
  finalLanguages: any;
  finalFinalLanguages: any;


  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.languages = this.getNbReposPerLanguages();
    this.finalLanguages = [];
    this.listLanguages = [];
    for (const language in this.languages){
      if (this.languages.hasOwnProperty(language)) {
           console.log('Key is ' + language + ', value is' + this.languages[language]);
           this.finalLanguages.push({value: this.languages[language], name: language});
      }
  }
  this.finalLanguages.sort(this.sortNumber);
  this.finalFinalLanguages = [];
  for (var i = 0; i < 10; i++ ) {
    this.finalFinalLanguages.push(this.finalLanguages[i]);
    this.listLanguages.push(this.finalFinalLanguages[i].name);

  }
  console.log(this.finalLanguages);
  console.log(this.finalFinalLanguages);



    // this.finalLanguages.push({value: })


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
          data: this.listLanguages,
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
            data: this.finalFinalLanguages,
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

  getNbReposPerLanguages(){
    const languages = {};
    this.organization.repos.forEach(function(repo) {
      repo.languages.forEach(function(language) {
        console.log('Languages name : ' + language.name);
        if (languages.hasOwnProperty(language.name)) {
          languages[language.name]++;
        } else {
          languages[language.name] = 1;
        }
      });
    });
    return languages;
  }

  sortNumber(a, b) {
    return b.value - a.value;
  }
}
