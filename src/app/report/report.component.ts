import {Component, OnInit, ViewChild} from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import {Chart, ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public showStatics: boolean =false;
  public Report: any;
  public CurrentReport:any
  public Data1:any[]=[]
  public MarksList: any;
   constructor(private http:HttpClient,) {
    Chart.register(Annotation)
  }

  @ViewChild(BaseChartDirective) chartt: BaseChartDirective | undefined;

  public reportList:any

  ngOnInit(): void {
    this.http
      .get("http://localhost:8089/Report")
      .subscribe(response=> {
        this.reportList = JSON.parse(JSON.stringify(response));})
  }
public SubjectId:any
private  counter:number = 0;
  showReport(Report: any) {
    this.counter=this.counter+1
    if (this.counter!=1){
      window.location.reload()
    }
    this.showStatics = true
    this.CurrentReport = this.reportList[Report];
    this.SubjectId = this.CurrentReport?.subjectId
    this.showRanks(this.SubjectId)
    this.Data1.push(this.CurrentReport?.below30)
    this.Data1.push(this.CurrentReport?.noOfStudBetween30and55)
    this.Data1.push(this.CurrentReport?.noOfStudBetween55and65)
    this.Data1.push(this.CurrentReport?.noOfStudBetween65and75)
    this.Data1.push(this.CurrentReport?.noOfStudAbove75)
    console.error(this.Data1)
  }
 showRanks(subjectId:string){
   this.http
     .get("http://localhost:8089/subjectMarks/"+subjectId)
     .subscribe(response=> {
       this.MarksList = JSON.parse(JSON.stringify(response));})
 }




  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Bellow', '30' ], [ 'Between', '30', 'and',"54" ], [ 'Between', '55', 'and',"64" ],[ 'Between', '65', 'and',"74" ],[ 'Between', '75', 'and',"100" ] ],
    datasets: [ {
      data: this.Data1
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }





  /*public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.Data1,
        label: 'Distribution',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      } ],
    labels: [ '20', '40', '60', '80', '100' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;




  // events
  public chartClickedd({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHoveredd({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }*/

}
