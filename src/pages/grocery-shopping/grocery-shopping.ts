import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {GroceriesService} from "../../services/groceries";
import {Product} from "../../models/products";
import {GroceryStorePage} from "../grocery-store/grocery-store";
import {DataVerificationPage} from "../data-verification/data-verification";

@IonicPage()
@Component({
  selector: 'page-grocery-shopping',
  templateUrl: 'grocery-shopping.html',
})
export class GroceryShoppingPage implements OnInit{

  items: Product[];
  groceryStorePage = GroceryStorePage;

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

  openModal(type: string, id_product: number){
    let modal = this.modalCtrl.create('GroceryModalPage', {type: type, id_product: id_product});
    modal.onDidDismiss(() => {
      this.onLoadItems();
    });
    modal.present();
  }

  openAuthenticationModal(){
    let modal = this.modalCtrl.create('AuthenticationPage');
    modal.present();

    modal.onDidDismiss(data => {
      if(data.code == true){
        this.verificationPage();
      }else{
        console.log(data.code);
      }
    });
    // this.verificationPage();
  }

  verificationPage(){
    this.navCtrl.push(DataVerificationPage);
  }

}
