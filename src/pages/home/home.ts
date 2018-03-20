import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {IluminationPage} from "../ilumination/ilumination";

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
    {
      name: "Entretenimiento",
      icon: "md-desktop",
      color: "black"
    },
    {
      name: "Electrodomésticos",
      icon: "md-outlet",
      color: "#f2f2f2"
      // color:"#636e72"
    },
    {
      name: "Calefacción",
      icon: "md-thermometer",
      color: "#e69500"
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
    *  1: Elect*/
    switch (index){
      case 0:
        this.navCtrl.push(IluminationPage);
        break;
    }
  }
}
