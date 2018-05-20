import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {GroceriesService} from "../../services/groceries";
import {DataVerificationPage} from "../data-verification/data-verification";
import {ShoppingList} from "../../models/ShoppingList";
import {ProductsService} from "../../services/products";
import {Payment} from "../../models/Payment";
import {ServicePaymentsService} from "../../services/servicePayments";
// import {Product} from "../../models/Product";

@IonicPage()
@Component({
  selector: 'page-grocery-shopping',
  templateUrl: 'grocery-shopping.html',
})
export class GroceryShoppingPage{

  /* It'll contain just the references to the products that will be searched */
  items: ShoppingList[];
  /* Products info for each items.id_prod <-- Obtained by Products API */
  products: Array<any> = [];
  company: string; // Company you selected to buy your groceries

  total: number;
  subtotal: number;
  iva: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public groceriesService: GroceriesService,
              public modalCtrl: ModalController,
              public productsService: ProductsService,
              public loadingCtrl: LoadingController,
              public servicePayment: ServicePaymentsService) {
  }

  ionViewWillEnter(){
    this.onLoadItems();
    console.log("ionViewWillEnter --items: " + this.items);
    if(this.items.length != 0){
      for (var i = 0; i < this.items.length; i++){
        console.log("--item: " + this.items[i].id_product + " quantity: " + this.items[i].quantity);
      }
    }
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    this.onLoadProducts();
    this.company = this.navParams.get("company");
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
        this.createPaymentInfo();
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
    if(this.items.length != 0 || this.items != null){
      for(var i = 0; i < this.products.length; i++){
        this.total += (this.products[i].price * this.items[i].quantity);
      }
    }
    this.subtotal = (this.total * 0.84);
    this.iva = (this.total - this.subtotal);

    console.log("calculateTotal() --ended");
  }

  private createPaymentInfo() {
    console.log("Creating payment info...");
    this.servicePayment.addService("Compra de despensa", this.total, "**** *321", this.company)
  }
}

