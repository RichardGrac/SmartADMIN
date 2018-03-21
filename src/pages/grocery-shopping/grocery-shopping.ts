import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {GroceriesService} from "../../services/groceries";
import {Product} from "../../models/products";

@IonicPage()
@Component({
  selector: 'page-grocery-shopping',
  templateUrl: 'grocery-shopping.html',
})
export class GroceryShoppingPage implements OnInit{

  items: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public groceriesService: GroceriesService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter(){
    this.onLoadItems();
  }

  ngOnInit(): void {
    this.onLoadItems();
  }

  onDeleteItem(index: number){
    this.groceriesService.deleteProduct(index);
    this.onLoadItems();
  }

  onLoadItems(){
    this.items = this.groceriesService.getProducts();
  }

  openModal(type: string){
    let modal = this.modalCtrl.create('GroceryModalPage', {type: type});
    modal.onDidDismiss(() =>
      this.onLoadItems()
    );
    modal.present();

  }

}
