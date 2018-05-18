import {Product} from "../models/Product";
import {ProductsApiProvider} from "../providers/products-api/products-api";
import { Component } from '@angular/core';

@Component({})

export class ProductsService {

  products: Array<Product> = [];
  // products;

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
      return this.products.find(x => x.id_product == id_product);
    }
  }

  doingRequest(){
    console.log('DoingRequest()');
    this.productsProvicer.getProducts()
      .subscribe(
        (data) => {this.convertDataToProducts(data);},
        (error) => {console.log('[API] Error getting products: ' + error);}
      );
  }

  convertDataToProducts(data: any){
    this.products = [];
    for (var i = 0; i < data.length; i++){
      this.products.push(new Product(data[i].id, data[i].category, data[i].price, data[i].name, data[i].type));
      console.log("Product added")
    }
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
