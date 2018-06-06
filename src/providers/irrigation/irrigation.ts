import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IrrigationProvider {

  private API_URl: string = 'https://smart-admin-master.herokuapp.com';
  // private API_URl: string = 'http://localhost:5000';

  constructor(public http: HttpClient) {
    console.log('Hello IrrigationProvider Provider');
  }


  setStatus(data) {
    console.log('providerFirestore --- ', data);
    const {idsystem} = data;
    return this.http.get(`${this.API_URl}/api/irrigation/${idsystem}`)
  }

  setAutoOn(data) {
    const {idsystem} = data;
    return this.http.get(`${this.API_URl}/api/irrigation/${idsystem}/autoon`);
  }

  setAutoOff(data) {
    const {idsystem} = data;
    return this.http.get(`${this.API_URl}/api/irrigation/${idsystem}/autooff`);
  }

  setName(data) {
    const {idsystem, name} = data;
    return this.http.patch(`${this.API_URl}/api/irrigation/${idsystem}`, {name: name});
  }

  changeTimeStarts(data) {
    const {idsystem, timeStarts} = data;
    return this.http.patch(`${this.API_URl}/api/irrigation/${idsystem}/timeStart`, {timeStart: timeStarts});
  }

  changeTimeEnds(data) {
    const {idsystem, timeEnd} = data;
    return this.http.patch(`${this.API_URl}/api/irrigation/${idsystem}/timeEnd`, {timeEnd: timeEnd});
  }

}
