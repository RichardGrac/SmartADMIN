import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {IluminationPage} from "../ilumination/ilumination";
import {GroceryShoppingPage} from "../grocery-shopping/grocery-shopping";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: Array<any> = [
    {
      name: "Iluminación",
      icon: "md-sunny",
      color: "#f1c40f"
    },
    // {
    //   name: "Entretenimiento",
    //   icon: "md-desktop",
    //   color: "black"
    // },
    {
      name: "Electrodomésticos",
      icon: "md-outlet",
      color: "#CAD3C8"
      // color:"#636e72"
    },
    {
      name: "Calefacción",
      icon: "md-thermometer",
      color: "#fff200"
      // color: "#e69500"
    },
    {
      name: "Despensa",
      icon: "md-cart",
      // color: "#fff200"
      color: "#e48b81"
    },
    {
      name: "Seguridad",
      icon: "md-lock",
      color: "black"
    },
    {
      name: "Vigilancia",
      icon: "ios-videocam",
      color: "white"
      // color: "#2c3e50"
    }
    // {
    //   name: "Servicios",
    //   icon: "md-card",
    //   // color: "white"
    //   color: "#ffa502"
    // }
  ]

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController) {

  }

  searchAppliances() {
    this.loadingCtrl.create({
      content: 'Buscando dispositivos...',
      duration: 5000,
      dismissOnPageChange: true
    }).present();
  }

  pushPage(index: number) {
    /* 0: Iluminación
    *  3: Despensa */
    switch (index){
      case 0:
        this.navCtrl.push(IluminationPage);
        break;
      case 3:
        this.navCtrl.push(GroceryShoppingPage);
        break;
    }
  }
}
