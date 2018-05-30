import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {GroceriesService} from "../../services/groceries";
import {Product} from "../../models/Product";
import {ShoppingList} from "../../models/ShoppingList";
import {ProductsService} from "../../services/products";
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grocery-modal',
  templateUrl: 'grocery-modal.html',
})
export class GroceryModalPage implements OnInit{
  @ViewChild(Content) content: Content;

  type_of_page: string;
  id_sl: number;  // id_sl == -1 means that It's a new Shopping List aggregation, not a modify of a product.
  p_type: string = 'Unidades';

  /* For all the Products availables at the Store:  */
  items: Array<Product> = [];
  /* One product-quantity & one product */
  product_q: ShoppingList;
  product: Product;

  products: Array<Product> = [];
  colored: string = "";

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private groceryService: GroceriesService,
              protected productsService: ProductsService
              ) {

    this.product_q = new ShoppingList(0, "", 1);
    this.product = new Product("", "", 0, "", "Unidad");
    this.initializeItems();
  }

  ngOnInit(): void {
    this.type_of_page = this.navParams.get('type');
    this.id_sl = this.navParams.get('id_sl');

    /* -1 means that The user clicked on "New Product" */
    if (this.id_sl != -1){
      console.log("ngOnInit() --id_sl != -1");
      this.onGetProduct();
    }
  }

  initializeItems() {
    console.log("initializeItems()");
    this.products = this.productsService.getApiProducts();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onRegisterItem(form: NgForm){
    console.log("onRegisterItem()");
    /* When a New Item is going to be added to the Shopping List of the User */
    if (this.id_sl == -1){
      this.groceryService.addProduct(this.product.id_product, form.value.p_quantity);
      this.presentToast('Producto agregado satisfactoriamente');
      form.reset();
      this.product = new Product("", "", 0, "", "");
      this.product_q.quantity = 0;
      this.colored = "";
    } else {
      /* When is a modification of a Product */
      this.groceryService.modifyQuantity(this.id_sl, form.value.p_quantity);
      this.closeModal();
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  onGetProduct() {
    console.log("onGetProduct()");
    this.product_q = this.groceryService.getProduct(this.id_sl);
    this.product = this.productsService.getApiProduct(this.product_q.id_product);
    console.log("onGetProduct() --product_q: " + this.product_q);
    this.p_type = this.product.type;
  }

  onDeleteProduct(id_sl: number) {
    this.groceryService.deleteProduct(id_sl);
    this.closeModal();
  }

  getItems(ev: any) {
    console.log("getItems()");
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  productSelected(item: Product) {
    console.log("productSelected() --Product.name: " + item.name + " --Product.id: " + item.id_product);
    this.product_q.quantity = 1;
    this.product = item;
    this.colored = item.name;
    this.content.scrollToTop(600);
  }

  changeQuantity(band: string) {
    if(band == '+'){
      this.product_q.quantity = this.product_q.quantity + 1;
    }else if (band == '-' && this.product_q.quantity > 1){
      this.product_q.quantity = this.product_q.quantity - 1;
    }
  }
}
