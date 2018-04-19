import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {GroceriesService} from "../../services/groceries";
import {DataVerificationPage} from "../data-verification/data-verification";
import {ShoppingList} from "../../models/ShoppingList";
import {ProductsService} from "../../services/products";
// import {Product} from "../../models/Product";

@IonicPage()
@Component({
  selector: 'page-grocery-shopping',
  templateUrl: 'grocery-shopping.html',
})
export class GroceryShoppingPage{

  items: ShoppingList[];
  products: Array<any> = [];

  total: number;
  subtotal: number;
  iva: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public groceriesService: GroceriesService,
              public modalCtrl: ModalController,
              public productsService: ProductsService,
              public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    this.onLoadItems();
    console.log("ionViewWillEnter --items: " + this.items);
    for (var i = 0; i < this.items.length; i++){
      console.log("--item: " + this.items[i].id_product + " quantity: " + this.items[i].quantity);
    }
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    this.onLoadProducts();
  }

  onDeleteItem(index: number){
    this.groceriesService.deleteProduct(index);
    this.onLoadItems();
    this.onLoadProducts();
  }

  onLoadItems(){
    this.items = this.groceriesService.getProducts();
  }

  openModal(type: string, id_sl: number){
    let modal = this.modalCtrl.create('GroceryModalPage', {type: type, id_sl: id_sl});
    modal.onDidDismiss(() => {
      this.resetArrays();
      this.onLoadItems();
      this.onLoadProducts();
    });

    const loading = this.loadingCtrl.create({
      content: 'Obteniendo datos',
      duration: 500
    });

    loading.onDidDismiss(() => {
      modal.present();
    });
    loading.present();
  }

  openAuthenticationModal(){
    let modal = this.modalCtrl.create('AuthenticationPage');
    modal.present();

    modal.onDidDismiss(data => {
      if(data.successful_code == true){
        this.verificationPage();
      }else{
        console.log(data.error_code);
      }
    });
    // this.verificationPage();
  }

  verificationPage(){
    this.navCtrl.push(DataVerificationPage);
  }

  /* We load the array of products for each id_product that are in the ShoppingList[] */
  private onLoadProducts() {
    console.log("onLoadProducts()");
    this.products = [];
    for (var i = 0; i < this.items.length; i++){
      var p = this.productsService.getApiProduct(this.items[i].id_product);
      if(p != null){
        console.log('this.products.push: ' + p.name);
        this.products.push(p);
      }
    }
    console.log("onLoadProducts() --ended");
    this.calculateTotal();
  }

  private resetArrays() {
    this.items = [];
    this.products = [];
  }

  calculateTotal(){
    console.log("calculateTotal()");
    this.total = 0;
    for(var i = 0; i < this.products.length; i++){
      this.total += (this.products[i].price * this.items[i].quantity);
    }
    this.subtotal = (this.total * 0.84);
    this.iva = (this.total - this.subtotal);

    console.log("calculateTotal() --ended");
  }
}

