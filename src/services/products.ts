// import {Product} from "../models/Product";
import {ProductsApiProvider} from "../providers/products-api/products-api";
import { Component } from '@angular/core';

@Component({})

export class ProductsService {

  // items: Array<Product> = [];
  products;

  constructor(public productsProvicer: ProductsApiProvider) {
    this.doingRequest();
  }

  getApiProducts(){
    this.doingRequest();
    if (this.products != null){
      return this.products;
    }
  }

  getApiProduct(id_product: string){
    console.log("getProduct()  --id_prod:" + id_product);
    this.doingRequest();
    if (this.products != null) {
      console.log('Product[0]: ' + this.products[0].id);
      return this.products.find(x => x.id == id_product);
    }
  }

  doingRequest(){
    console.log('DoingRequest()');
    this.productsProvicer.getProducts()
      .subscribe(
        (data) => {this.products = data;},
        (error) => {console.log('[API] Error getting products: ' + error);}
      );
  }

  // getProducts() {
  //   return this.items.slice();
  // }

  // getProduct(id_product: number){
  //   // console.log(this.productsApiProvider.getProducts());
  //   console.log("getProduct()  --id_prod:" + id_product);
  //   return this.items.find(x => x.id_product == id_product);
  // }
}
