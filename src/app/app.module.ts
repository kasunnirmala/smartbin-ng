import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
const config: SocketIoConfig = { url: 'http://138.197.92.157:4445', options: {} };


// const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     SocketIoModule.forRoot(config),
    ChartsModule,
    HttpClientModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
