import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsApiProvider {

  data;

  constructor(public http: HttpClient) {
    console.log('Hello ProductsApiProvider Provider');
  }

  getProducts(){
    console.log('Requesting data of Firebase...');
    this.data = this.http.get('https://smart-admin-master.herokuapp.com/api/products');
    console.log('Data received...');
    return this.data;
  }

}
