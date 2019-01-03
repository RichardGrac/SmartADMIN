import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsApiProvider {

  data;

  constructor(public http: HttpClient) {}

  getProducts(){
    this.data = this.http.get('https://smart-admin-master.herokuapp.com/api/products');
    return this.data;
  }

}
