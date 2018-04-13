import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductsApiProvider Provider');
  }

  getProducts(){
    return this.http.get('https://smart-admin-master.herokuapp.com/api/products');
  }

}
