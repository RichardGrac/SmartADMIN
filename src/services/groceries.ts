import {Product} from "../models/products";

export class GroceriesService {

  items: Array<Product> = [];

  constructor() {
    this.items.push(new Product(0, 'Barra Pan Bimbo Blanco', 2, 'Pzs.'));
    this.items.push(new Product(1, 'Jamon de Pavo FUD', 0.5, 'Kgs.'));
    this.items.push(new Product(2, 'Coca Cola 2LT', 1, 'Pzs.'));
    this.items.push(new Product(3, 'Aguacates', 6, 'Kgs.'));
    this.items.push(new Product(4, 'Leche San Marcos', 6, 'Lts.'));
    this.items.push(new Product(5, 'Desodorante AXE Dark', 1, 'Pzs.'));
  }

  addProduct(name: string, quantity: number, type: string) {
    this.items = this.getProducts();
    if (this.items.length > 0) {
      this.items.push(new Product((this.items[this.items.length - 1].id) + 1, name, quantity, type));
    } else {
      this.items.push(new Product(0, name, quantity, type));
    }
    console.log(this.items);
  }

  getProducts() {
    return this.items.slice();
  }

  getProduct(id_product: number) {
    // var index_product = this.findProductById(id_product);
    return this.items.find(x => x.id == id_product);
    // return this.items[index_product];
  }

  deleteProduct(id_product: number) {
    var index_product = this.findProductIndexById(id_product);
    this.items.splice(index_product, 1);
  }

  deleteAll() {
    this.items = [];
  }

  modifyProduct(id_product: number, p_name: string, p_quantity: number, p_type: string) {
    console.log('id_p: ' + id_product);
    var index_product = this.findProductIndexById(id_product);
    this.items[index_product].setAll(p_name, p_quantity, p_type);
  }

  findProductIndexById(id_product: number) {
    return this.items.findIndex(x => x.id == id_product);
  }
}
