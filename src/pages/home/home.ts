import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IluminationPage} from "../ilumination/ilumination";
import {VigilancePage} from "../vigilance/vigilance";
// import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {GroceryStorePage} from "../grocery-store/grocery-store";
import {ProductsService} from "../../services/products";
import {ServicesPage} from "../services/services";
import {TemperaturePage} from "../temperature/temperature";
import {IrrigationPage} from "../irrigation/irrigation";
import {TemperaturesService} from "../../services/temperatures";


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
    // {
    //   name: "Electrodomésticos",
    //   icon: "md-outlet",
    //   img: "assets\\imgs\\Home\\fridge.png",
    //   color: "#CAD3C8"
    //   // color:"#636e72"
    // },
    {
      name: "Sistema de Riego",
      icon: "md-outlet",
      img: "assets\\imgs\\Home\\irrigation.png",
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
    // {
    //   name: "Seguridad",
    //   icon: "md-lock",
    //   img: "assets\\imgs\\Home\\security.png",
    //   color: "black"
    // },
    {
      name: "Pago de Servicios",
      icon: "md-lock",
      img: "assets\\imgs\\Home\\services.png",
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

  /* I'm declaring productsService in order to start requesting the products from the API */
  constructor(public navCtrl: NavController,
              public productsService: ProductsService,
              public temperaturesService: TemperaturesService
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
    switch (index) {
      case 0:
        this.navCtrl.push(IluminationPage);
        break;
      case 1:
        this.navCtrl.push(IrrigationPage);
        break;
      case 2:
        this.navCtrl.push(TemperaturePage);
        break;
      case 3:
        this.navCtrl.push(GroceryStorePage);
        break;
      case 4:
        this.navCtrl.push(ServicesPage);
        break;
      case 5:
        this.navCtrl.push(VigilancePage);
    }
  }
}
