import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicesApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesApiProvider {

  barcode_service : string = "https://smart-admin-master.herokuapp.com/services/validate";
  // barcode_service: string = "http://192.168.137.204:5000/services/validate";
  payment_service : string = "https://smart-admin-master.herokuapp.com/services/payment";
  // payment_service : string = "http://192.168.137.204:5000/services/payment";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(public http: HttpClient) {
    console.log('Hello ServicesApiProvider Provider');
  }

  registerPayment(card_number: string, name: string, amount: number, operation_name: string, company: string){
    console.log("--METHOD: registerPayment()");
    let body = {
      card: card_number,
      name: name,
      amount: amount,
      operation_name: operation_name,
      company: company
    };
    return this.http.post(this.payment_service, JSON.stringify(body), this.httpOptions)
  }

  verify_barcode(barcode: string, type_service: string){
    console.log("--METHOD: verify_barcode(): barcode: ", barcode, ", type: ",type_service);
    let body = {
      barcode: barcode,
      type: type_service
    };
    return this.http.post(this.barcode_service, JSON.stringify(body), this.httpOptions);
  }
}
