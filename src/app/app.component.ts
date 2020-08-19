import {Component, OnInit, ViewChild} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {formatDate} from '@angular/common';
import {DeviceDataModal} from './modal/deviceData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private socket: Socket) {


    this.socket.on('tea-msg', (message) => {
      // alert(message);

      let deviceData: DeviceDataModal = new DeviceDataModal();
      let splitArr = message.toString().split(':');


      deviceData.top_humidity = parseFloat(splitArr[2].split('%')[0]);
      deviceData.bottom_humidity = parseFloat(splitArr[2].split('%')[1]);
      deviceData.top_temperature = parseFloat(splitArr[3].split('*C')[0]);
      deviceData.bottom_temperature = parseFloat(splitArr[3].split('*C')[1]);
      // deviceData.timestamp = moment();
      deviceData.datetime = formatDate(new Date(), 'MM/dd hh:mm a', 'en-US');
      // deviceData.date = moment().format("YYYY-MM-DD");
      deviceData.time = formatDate(new Date(), 'HH:mm a', 'en-US');
      console.log(deviceData);


      this.temperatureDiff.push(Math.abs(deviceData.top_temperature - deviceData.bottom_temperature));
      this.HumidityDiff.push(Math.abs(deviceData.top_humidity - deviceData.bottom_humidity));


      this.temperature01.push(deviceData.top_temperature);
      this.temperature02.push(deviceData.bottom_temperature);
      this.Humidity01.push(deviceData.top_humidity);
      this.Humidity02.push(deviceData.bottom_humidity);


      this.lineChartLabels.push(deviceData.time);

    });
  }


  redcolor = {
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderColor: 'rgba(255,0,0,1)',
    pointBackgroundColor: 'rgba(255,0,0,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255,0,0,0.8)'
  };

  orangecolor = {
    backgroundColor: 'rgba(253,106,2,0.2)',
    borderColor: 'rgba(253,106,2,1)',
    pointBackgroundColor: 'rgba(253,106,2,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(253,106,2,0.8)'
  };


  bluecolor = {
    backgroundColor: 'rgba(0,0,255,0.2)',
    borderColor: 'rgba(0,0,255,1)',
    pointBackgroundColor: 'rgba(0,0,255,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,0,255,0.8)'
  };

  greencolor = {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderColor: 'rgba(0,255,0,1)',
    pointBackgroundColor: 'rgba(0,255,0,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,255,0,0.8)'
  };


  public lineChartColorsDevice01: Color[] = [
    this.redcolor, this.bluecolor
  ];

  public lineChartColorsDevice02: Color[] = [
    this.orangecolor,this.greencolor
  ];



  temperatureDiff = [0];
  HumidityDiff = [0];
  temperature01 = [0];
  Humidity01 = [0];
  temperature02 = [0];
  Humidity02 = [0];
  public lineChartLabels: Label[] = ['0'];


  public lineChartData: ChartDataSets[] = [
    {data: this.temperatureDiff, label: 'Temperature Difference',},
    {data: this.HumidityDiff, label: 'Humidity Difference',}
  ];


  public lineChartDataDevice01: ChartDataSets[] = [
    {data: this.temperature01, label: 'Temperature - top',},
    {data: this.temperature02, label: 'Temperature - bottom',},

  ];


  public lineChartDataDevice02: ChartDataSets[] = [
    {data: this.Humidity01, label: 'Humidity - top',},
    {data: this.Humidity02, label: 'Humidity - bottom',}
  ];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{

        id: 'xaxis-0',
        position: 'left',
        ticks: {
          fontColor: 'black',
          fontStyle: 'bold',
          fontSize: 15
        }
      }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'black',

            fontStyle: 'bold',
            fontSize: 20
          }
        }
      ]
    },
    annotation: {
      annotations: [
        //     {
        //       type: 'line',
        //       mode: 'vertical',
        //       scaleID: 'x-axis-0',
        //       value: 'March',
        //       borderWidth: 2,
        //       label: {
        //         enabled: true,
        //         content: 'LineAnno'
        //       }
        //     },
      ],
    },
  };

  public lineChartType = 'line';

  ngOnInit() {
  }

}
