import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GroceryStoresService} from "../../services/grocery-stores";
import {Store} from "../../models/stores";
import {GroceryShoppingPage} from "../grocery-shopping/grocery-shopping";

@IonicPage()
@Component({
  selector: 'page-grocery-store',
  templateUrl: 'grocery-store.html',
})
export class GroceryStorePage implements OnInit{

  stores: Store[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public groceryStoreService: GroceryStoresService) {
  }

  ngOnInit(): void {
    this.stores = this.groceryStoreService.getStores();
  }

  openShoppingList(company: string){
    this.navCtrl.push(GroceryShoppingPage, {"company": company});
  }
}
