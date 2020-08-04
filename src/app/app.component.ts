import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private socket: Socket) {




    this.socket.on('new-message', (message) => {
      // alert(message);

      if (parseFloat(message) > 180) { message = parseFloat(message); }

      if (this.data.length == 1) {
        this.data[0] = parseFloat(message);
        this.data.push(parseFloat(message));
      } else {
        this.data.push(parseFloat(message));
      }
      this.lineChartLabels.push(formatDate(new Date(), 'MM/dd hh:mm a', 'en-US'));

      if (parseFloat(message) > 120) {
        this.lineChartColors = [this.greencolor];
      } else if (parseFloat(message) > 80) {
        this.lineChartColors = [this.bluecolor];
      } else if (parseFloat(message) > 40) {
        this.lineChartColors = [this.orangecolor];
      } else {
        this.lineChartColors = [this.redcolor];
      }
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



  data = [82];
  public lineChartLabels: Label[] = ['0'];
  public lineChartData: ChartDataSets[] = [
    { data: this.data, label: 'PET Smart Bin Free Space (cm)', },
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
            min: 0,
            max: 180,
            fontStyle: 'bold',
            fontSize: 20
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };




  // public lineChartOptions: ChartOptions = {
  //   responsive: true,
  //   showLines: false,
  //   scales: {
  //     yAxes: [{
  //       ticks: {
  //         max: 180,
  //         min: 0
  //       }
  //     }]
  //   }

  // };

  public lineChartType = 'line';

  public lineChartColors: Color[] = [
    this.bluecolor
  ];

  ngOnInit() {
  }

}
