import {ShoppingList} from "../models/ShoppingList";

export class GroceriesService {

  items: Array<ShoppingList> = [];

  constructor() {
    this.items.push(new ShoppingList(0, "13MmYMBEy3po6Gb1S43c",2));
    this.items.push(new ShoppingList(1, "1wmikpFxxxLq8RHpQ6yv",1));
  }

  addProduct(id_product: string, quantity: number) {
    console.log("addProduct() --id_product: " + id_product);
    // this.items = this.getProducts();
    this.items.push(new ShoppingList(this.getShoppingListId(), id_product, quantity));
    console.log(this.items);
  }

  getProducts() {
    return this.items.slice();
  }

  getProduct(id_sl: number) {
    // var index_product = this.findProductById(id_product);
    return this.items.find(x => x.id_sl == id_sl);
    // return this.items[index_product];
  }

  deleteProduct(id_sl: number) {
    var index_product = this.findProductIndexById(id_sl);
    this.items.splice(index_product, 1);
  }

  /*
  * It's used when the Shopping Process ends. The Shopping List is cleaned.
  * */
  deleteAll() {
    this.items = [];
  }

  modifyQuantity(id_sl: number, p_quantity: number) {
    var index_product = this.findProductIndexById(id_sl);
    this.items[index_product].quantity = p_quantity;
  }

  findProductIndexById(id_sl: number) {
    return this.items.findIndex(x => x.id_sl == id_sl);
  }

  /*
  * Returns the 'id_sl' for the new Row
  * */
  private getShoppingListId() {
    if(this.items.length == 0){
      return 0;
    }else{
      return this.items.length;
    }
  }
}
