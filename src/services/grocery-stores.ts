import {Store} from "../models/stores";

export class GroceryStoresService{

  stores: Array<Store> = [];

  constructor(){
    this.stores.push(new Store('HBE', 'Lo mejor todos los días', 'assets/imgs/hbe-logo.png'));
    this.stores.push(new Store('Waltmart', 'Ahorre dinero. Viva mejor', 'assets/imgs/waltmart-logo.png'));
    this.stores.push(new Store('Costco', 'Wholesale', 'assets/imgs/costco-wholesale.png'));
    this.stores.push(new Store('Mega', 'La Calidad y Comodidad que prefieres', 'assets/imgs/mega-logo.png'));
    this.stores.push(new Store('Soriana', 'El Súper Mexicano', 'assets/imgs/soriana-logo.png'));
    this.stores.push(new Store('Chedraui', 'Cuesta Menos', 'assets/imgs/chedraui-logo.png'));
  }

  getStores(){
    console.log('Hello, stores: ' + this.stores);
    return this.stores.slice();
  }
}
