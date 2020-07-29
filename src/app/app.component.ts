import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data = [100];
  public lineChartLabels: Label[] = ['test'];
  constructor(private socket: Socket) {

    this.socket.on('new-message', (message) => {
      // alert(message);
      this.data.push(parseFloat(message));
      this.lineChartLabels.push(new Date().toISOString());
    });
  }
  public lineChartData: ChartDataSets[] = [
    { data: this.data, label: 'HEIGHT' },
  ];

  public lineChartType = 'line';

  ngOnInit() {
  }


}
