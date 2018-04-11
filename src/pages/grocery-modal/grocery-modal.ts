import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {GroceriesService} from "../../services/groceries";
import {Product} from "../../models/products";

@IonicPage()
@Component({
  selector: 'page-grocery-modal',
  templateUrl: 'grocery-modal.html',
})
export class GroceryModalPage implements OnInit{

  type_of_page: string;
  id_product: number;
  product: Product = new Product(0, '', 1, 'Pzs.');

  p_type: string = 'Pzs.';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private groceryService: GroceriesService) {
  }

  ngOnInit(): void {
    this.type_of_page = this.navParams.get('type');
    this.id_product = this.navParams.get('id_product');

    if (this.id_product != -1){
      this.onGetProduct();
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onRegisterItem(form: NgForm){
    if (this.id_product == -1){
      this.groceryService.addProduct(form.value.p_name, form.value.p_quantity, form.value.p_type);
      this.presentToast('Producto agregado satisfactoriamente');
      form.reset();

    } else {
      this.groceryService.modifyProduct(this.id_product, form.value.p_name, form.value.p_quantity, form.value.p_type);
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
    this.product = this.groceryService.getProduct(this.id_product);
    this.p_type = this.product.type;
  }

  onDeleteProduct(id_product: number) {
    this.groceryService.deleteProduct(id_product);
    this.closeModal();
  }
}
