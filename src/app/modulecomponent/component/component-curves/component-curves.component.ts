import { Component, Input, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentModel } from '../../data/model/component.model';
import { FormGroup, FormBuilder} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import 'chart.js';
import 'chartjs-plugin-dragdata'; 
import { ComponentService } from '../../data/service/component.service';
import { ComponentcurvesModel } from '../../data/model/componentcurves.model';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import * as Chart from 'chart.js';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-component-curves',
  templateUrl: './component-curves.component.html',
  styleUrls: ['./component-curves.component.scss']
})


export class ComponentCurvesComponent implements OnInit {

  private euPrice: any[]=[null, null];
  private chiPrice: any[]=[null, null];
  private usaPrice: any[]=[null, null];

  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any> = [];
  public labelPrice: string ='Price (EUR)';
  private curveTitle: any = 'Component and Price';
  componentsSelected: ComponentModel[];
  components: ComponentModel[];
  componentwithAnalog : [ComponentModel[]];
  curvesData: ComponentcurvesModel[];
  canvas:any; ctx2:any;
  chartData: Chart.ChartData;
  datasets : Array<Chart.ChartDataSets>= [];
  economicAreaList : Array<string> = [];

  //Decalare form
  curvesForm: FormGroup;

  constructor(
    // @Inject(MAT_DIALOG_DATA) public component: ComponentModel,
    private formBuilder: FormBuilder, private componentService: ComponentService,
    private datepipe: DatePipe
  ) { 
    console.log("Composant transféré dans component courbes");

  }

  ngOnInit(): void {
    console.log('Initialisation interface pour courbes');
    // Initialisation de Form
  //  for(let i =0; i< this.componentsSelected.length ; i++){
  //     this.componentwithAnalog.push(this.components.filter( c => c.id_analog = this.componentsSelected[i].id_analog));
  //     idanalog=  this.componentsSelected[i].id_analog;
  //   }
     // console.log( this.componentsSelected);
    //this.components =JSON.parse(localStorage.getItem('components'));
   //console.log( this.componentsSelected.map(c => c.renaultpartnumber));
   // console.log(this.components);
    this.componentsSelected = this.componentService.getComponentSelected();
    var idanalog= this.componentsSelected[0].id_analog;
    console.log('Id analog of selected component');
    console.log(idanalog);
    this.componentService.getComponentsforCurves(idanalog).subscribe((cm) => {
    this.curvesData = cm;
    console.log(this.curvesData);
    console.log("Daty");
  
    this.curvesData.forEach(c =>{
      console.log(c.renaultpartnumber);
      console.log('Point');
      console.log(c.point.sort((a, b)=> (a.validityDate > b.validityDate ? 1:-1)));
    });
    // Foreach all component and set all chart data
    for(let i=0; i<this.curvesData.length; i++){
      let priceAndDate : Array<any> = [];
      this.curvesData[i].point.forEach(p => {
        priceAndDate.push({
          y: p.unitprice,
          t: p.validityDate
        });
        //xAxis.push(this.datepipe.transform(p.validityDate, 'yyyy-MM-dd'));
      });
      
      console.log('order data');
      console.log(priceAndDate);
      let lb = (this.curvesData[i].harnessMaker!= null) ? this.curvesData[i].harnessMaker:'Public price';//this.curvesData[i].renaultpartnumber +' '+ this.curvesData[i].programme;
      let color = this.getColor(this.curvesData[i].harnessMaker);
      let dataset: ChartDataSets ={
        data: priceAndDate,
        label : lb,
        lineTension: 0,
        yAxisID: 'B',
        fill: false,
        borderColor: color,
        borderWidth:2,
        backgroundColor:color
      }
      this.datasets.push(dataset); 
    }
    // this.curvesData[0].point.forEach(p =>{
    //   let price =(p.unitprice != null)?p.unitprice:null;
    //   yAxis0.push(price);
    // })
    // console.log('Axes des x');
    // console.log(xAxis);
    // console.log('Axes des y');
    // this.dataAxes= xAxis;
    // this.lineChartLabels = xAxis;
    //this.cmp1Data = yAxis0;
    //console.log( this.cmp1Data);
    // this.lineChartData = [
    //   {
    //     data:[] ,
    //     label: this.componentDesc1,
    //     lineTension: 0,
    //     yAxisID: 'A',
    //    // pointHitRadius: 30,
    //     fill: false,
    //   },
    //   {
    //     data:[],
    //     label: this.componentDesc2,
    //     lineTension: 0,
    //     yAxisID: 'A',
    //    // pointHitRadius: 30,
    //     fill: false,
    //   },
    //   {
    //     data: [],//[0.02,1.01, 1.8,1,0.5621, 0.0762],
    //     label: this.componentDesc3,
    //     lineTension: 0,
    //     yAxisID: 'B',
    //     //pointHitRadius: 30,
    //     fill: false,
    //   }
    // ];
    // this.lineChartData[1].data = this.cmp1Data;
    // for(let i= 0 ; i<this.curvesData.length; i++)
    // {
    //   this.lineChartData[i] = this.curvesData[i];
    // }

    this.canvas = document.getElementById('myChart2');
    this.ctx2 = this.canvas.getContext('2d');
    let myChart2 = new Chart(this.ctx2, {
      type: 'line',
      data: {
          datasets: this.datasets,
      },
      options: {
        legend: {
          display: true
          },
        responsive: true,
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.curveTitle, //'Frequency',
                fontSize: 16
              },
              type: 'time',
              time: {
                unit: 'day',
                unitStepSize: 365,
                displayFormats: {
                   'millisecond': 'MMM DD',
                   'second': 'MMM DD',
                   'minute': 'MMM DD',
                   'hour': 'MMM DD',
                   'day': 'll',
                   'week': 'MMM DD',
                   'month': 'MMM DD',
                   'quarter': 'MMM DD',
                   'year': 'MMM DD',
                }
              },
              ticks: {
                minRotation: 90,
                maxRotation: 90,
                callback: function(value) { 
                    return new Date(value).toLocaleDateString('br-FR', {day:'numeric',month:'numeric', year:'numeric'}); 
                },
              },
              position: 'bottom',
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.labelPrice,
                fontSize: 16
              },
              id: 'A',
              position: 'left',
              type: 'linear',
              ticks: {
                min: 0,
                max: 1,
                callback: function (tick) {
                  return tick.toString() ;//"dB";
                }
              }
             },      
             {
              scaleLabel: {
                display: false,
                labelString: 'Level',
                fontSize: 16
              },
              id: 'B',
              position: 'right',
              type: 'linear',
              ticks: {
                min: 0,
                max: 1,
                callback: function (tick) {
                  return tick.toString() ;//+ "dB";
                }
              }
             }
          ]
        }
      }
    });
  }, (err) => {
    alert('error when trying to get components, please retry later !');
    console.error(err);
  });
   
    // for(let i =0; i< this.componentsSelected.length ; i++){
    //   this.componentwithAnalog.push(this.components.filter( c => c.id_analog = this.componentsSelected[i].id_analog));
    // }

    //console.log(this.componentwithAnalog);
    // this.components.filter(c =>c.id_analog = 
    //   this.componentsSelected.forEach(function(cmp){cmp.id_analog}));

    this.initForm();
    // this.component?.offer?.forEach(element => {
    //   if(element.economicareacode=='EUR'){
    //     this.euPrice.push(element.price!.unitprice);
    //   }
    //   if(element.economicareacode=='CHI'){
    //     this.chiPrice.push(element.price!.unitprice);
    //   }
    //   if(element.economicareacode=='USA'){
    //     this.usaPrice.push(element.price!.unitprice);
    //   }
    // });

    this.lineChartOptions = {
      animation: false,
      responsive: true,
      title: {
        display: true,
        fontSize: 30,
        text: ''
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.curveTitle, //'Frequency',
            fontSize: 16
          },
          type: 'time',
          time: {
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
               'millisecond': 'MMM DD',
               'second': 'MMM DD',
               'minute': 'MMM DD',
               'hour': 'MMM DD',
               'day': 'll',
               'week': 'MMM DD',
               'month': 'MMM DD',
               'quarter': 'MMM DD',
               'year': 'MMM DD',
            }
          },
          ticks: {
            
            minRotation: 90,
            maxRotation: 90,
            callback: function(value) { 
                return new Date(value).toLocaleDateString('br-FR', {day:'numeric',month:'numeric', year:'numeric'}); 
            },
         },
          // ticks: {
          //   // forces step size to be 50 units
          //   stepSize: 50
          // },
          
          // time: {
          //   displayFormats: {
          //       quarter: 'MMM YYYY'
          //   }},
          position: 'bottom',
          // ticks: {
          //   min: 2000,
          //   max: 2010,
          //   minRotation: 90,
          //   maxRotation: 90,
          //   /*
          //   callback: function (tick) {
          //     if (tick < 1000) {
          //       return tick.toLocaleString();
          //     } else {
          //       let tempTick = tick / 1000;
          //       return tempTick.toLocaleString() + 'k';
          //     }
          //   }
          //   */
          // }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.labelPrice,
            fontSize: 16
          },
          id: 'A',
          position: 'left',
          type: 'linear',
          ticks: {
            min: 0,
            max: 5,
            // m: 'dB',
            callback: function (tick) {
              return tick.toString() ;//"dB";
            }
          }
         },      
         {
          scaleLabel: {
            display: false,
            labelString: 'Level',
            fontSize: 16
          },
          id: 'B',
          position: 'right',
          type: 'linear',
          ticks: {
            min: 0,
            max: 5,
            callback: function (tick) {
              return tick.toString() ;//+ "dB";
            }
          }
         }
      ]
      },
      dragData: true,
      dragX: false,
      dragDataRound: 0.5,
      onDragStart: (event, element) => { console.log(` `); },
      onDrag: (event, datasetIndex, index, value) => { console.log(`New y-value is ${value.y} `); },
      onDragEnd: (event, datasetIndex, index, value) => {
        console.log(`New y-value is ${value.y} `);
      },
    };
  }

  initForm(){
    this.curvesForm = this.formBuilder.group({
      componentDesc: [null],
      startDate: [null],
      endDate: [null],
      money:[null]
    });
  }

  ngAfterviewInit(){
    
  }
  onSubmitFilter(){
    // Reload curves
  }
  
  getLineChartData(){
    // Build date tab
   // this.lineChartData[0] =
  }

  getColor(val:any) {
    var answer = "";
    val =( val!= null)? val.toLocaleLowerCase(): null;
    switch( val ) {
      case 'yazaki':
        answer = 'rgba(255,140,0,1)';
        break;
      case 'leoni':
        answer = 'rgba(246, 238, 108, 1)';
        break;
      case 'sitel':
        answer = 'rgba(7, 7, 248, 1)';
        break;
      case 'aptiv':
          answer = 'rgba(247,24,7, 1)';
          break;
      case 'esmo corp.':
        answer = 'rgba(255,255,0,1)';
        break;
      case 'fujikura':
        answer = 'rgba(246, 126, 6, 1)';
        break;
      case 'minda furukawa':
        answer = 'rgba(11,156,49,0.4)';
        break;
      case 'motherson':
        answer = 'rgba(11,156,49,1)';
        break;
      case 'nursan':
        answer = 'rgba(3,3,110,1)';
        break;
      case 'sumitomo':
        answer = 'rgba(0,0,255,0.5)';
        break;
      case 'aptiv':
        answer = 'rgba(255, 0, 0, 1)';
        break;
      case 'aco':
        answer = 'rgba(90, 5, 105, 1)';
        break;
      case 'esmo corp.':
        answer = 'rgba(0, 128, 0, 1)';
        break;
      case 'slami':
        answer = 'rgba(109, 39, 39, 1)';
        break;
      case 'aptiv india':
        answer = 'rgba(234, 73, 73, 0.73)';
        break;
      case 'furukawa':
        answer = 'rgba(247, 207, 167, 1)';
        break;
      case null :
        answer = 'rgba(93, 3, 106, 1)';
        break;
      default:
        answer = 'black';
    }
    return answer;
  }
  

}

