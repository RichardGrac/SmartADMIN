import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {IluminationPage} from "../ilumination/ilumination";
import {VigilancePage} from "../vigilance/vigilance";
// import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {GroceryStorePage} from "../grocery-store/grocery-store";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: Array<any> = [
    {
      name: "Iluminación",
      icon: "md-sunny",
      img: "assets\\imgs\\Home\\ilumination.png",
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
      img: "assets\\imgs\\Home\\fridge.png",
      color: "#CAD3C8"
      // color:"#636e72"
    },
    {
      name: "Calefacción",
      icon: "md-thermometer",
      img: "assets\\imgs\\Home\\thermometre.png",
      color: "#fff200"
      // color: "#e69500"
    },
    {
      name: "Despensa",
      icon: "md-cart",
      img: "assets\\imgs\\Home\\shopping-cart.png",
      // color: "#fff200"
      color: "#e48b81"
    },
    {
      name: "Seguridad",
      icon: "md-lock",
      img: "assets\\imgs\\Home\\security.png",
      color: "black"
    },
    {
      name: "Vigilancia",
      icon: "ios-videocam",
      img: "assets\\imgs\\Home\\security-camera.png",
      color: "white"
      // color: "#2c3e50"
    }
    // {
    //   name: "Servicios",
    //   icon: "md-card",
    //   // color: "white"
    //   color: "#ffa502"
    // }
  ];

  constructor(public navCtrl: NavController
              // ,private screenOrientation: ScreenOrientation,
              // private platform: Platform
  ) {
    // if (!this.platform.is('core') && (!this.platform.is('mobileweb'))){
    //   //If type of platform is different of the Browser (ionic-lab) and serve (...:8100)
    //   console.log('Orientation locked!');
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // }
  }

  pushPage(index: number) {
    /* 0: Iluminación
    *  3: Despensa */
    switch (index){
      case 0:
        this.navCtrl.push(IluminationPage);
        break;
      case 3:
        this.navCtrl.push(GroceryStorePage);
        break;
      case 5:
        this.navCtrl.push(VigilancePage);
    }
  }
}
