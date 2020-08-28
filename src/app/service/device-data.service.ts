import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {deviceDataModel} from '../model/deviceData';
import {formatDate} from '@angular/common';

export const MAIN_URL = 'http://127.0.0.1:4444';
// export const MAIN_URL = 'http://138.197.92.157:4444';
const URL = '/deviceData';



@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {



  constructor(private http: HttpClient) { }

  getAllByDateAndID(node_id: string): Observable<Array<deviceDataModel>> {
    let date=formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    console.log(MAIN_URL + URL + '/byDateAndID/' + node_id + '/' + date);
    return this.http.get<Array<deviceDataModel>>(MAIN_URL + URL + '/byDateAndID/' + node_id + '/' + date);
  }



}
