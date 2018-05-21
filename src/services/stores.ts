import {Store} from "../models/stores";

export class StoresService{

  stores: Array<Store> = [];
  companies: Array<Store> = [];

  constructor(){
    // Grocery stores
    this.stores.push(new Store('HEB', 'Lo mejor todos los días', 'assets/imgs/hbe-logo.png'));
    this.stores.push(new Store('Waltmart', 'Ahorre dinero. Viva mejor', 'assets/imgs/waltmart-logo.png'));
    this.stores.push(new Store('Costco', 'Wholesale', 'assets/imgs/costco-wholesale.png'));
    this.stores.push(new Store('Mega', 'La Calidad y Comodidad que prefieres', 'assets/imgs/mega-logo.png'));
    this.stores.push(new Store('Soriana', 'El Súper Mexicano', 'assets/imgs/soriana-logo.png'));
    this.stores.push(new Store('Chedraui', 'Cuesta Menos', 'assets/imgs/chedraui-logo.png'));

    // Service companies
    this.companies.push(new Store('CFE', 'Comisión Federal de Electricidad', 'assets/imgs/Services/cfe.png'));
    this.companies.push(new Store('CAASA', 'Proactiva Medioambiente CAASA', 'assets/imgs/Services/caasa.png'));
    this.companies.push(new Store('Axtel', 'Comunícate mejor', 'assets/imgs/Services/axtel.png'));
    this.companies.push(new Store('Telmex', 'Está contigo', 'assets/imgs/Services/telmex.png'));
    this.companies.push(new Store('Telcel', 'La Red en tus manos', 'assets/imgs/Services/telcel.png'));
    this.companies.push(new Store('VeTV', 'VeTV por SKY', 'assets/imgs/Services/vetv.png'));
    // this.companies.push(new Store('Dish', 'Dish', 'assets/imgs/Services/dish.png'));
  }

  getStores(){
    return this.stores.slice();
  }

  getServicesCompanies(){
    return this.companies.slice();
  }
}
