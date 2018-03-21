import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {GroceriesService} from "../../services/groceries";

@IonicPage()
@Component({
  selector: 'page-grocery-modal',
  templateUrl: 'grocery-modal.html',
})
export class GroceryModalPage {

  type_of_page: string;

  p_type: string;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private groceryService: GroceriesService) {
  }

  ionViewWillLoad() {
    this.type_of_page = this.navParams.get('type');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onRegisterItem(form: NgForm){
    this.groceryService.addProduct(form.value.p_name, form.value.p_quantity, form.value.p_type);
    this.presentToast();
    form.reset();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Producto agregado satisfactoriamente',
      duration: 4000
    });
    toast.present();
  }

  onAddItem(){
    //  value.name is the "name" of the respective input
    // this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    // To refresh the new Items added.
    // this.loadItems();
  }
}
