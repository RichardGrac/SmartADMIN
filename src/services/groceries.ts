import {Product} from "../models/products";

export class GroceriesService{

  items: Array<Product> = [];

  constructor(){
    this.items.push(new Product('Barra Pan Bimbo Blanco',2, 'Pzs.'));
    this.items.push(new Product('Jamon de Pavo FUD',0.5, 'Kg.'));
    this.items.push(new Product('Coca Cola 2LT',1, 'Pzs.'));
    this.items.push(new Product('Aguacates',1, 'Kg.'));
    this.items.push(new Product('Leche San Marcos 1Lt',6, 'Pzs.'));
    this.items.push(new Product('Desodorante AXE Dark',1, 'Pzs.'));
  }

  addProduct(name: string, quantity: number, type: string){
    this.items.push(new Product(name, quantity, type));
    console.log(this.items);
  }

  getProducts(){
    return this.items.slice();
  }

  deleteProduct(index: number) {
    console.log('index: ' + index)
    this.items.splice(index, 1);
  }
}
