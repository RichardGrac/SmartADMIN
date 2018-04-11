import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {GroceriesService} from "../../services/groceries";


@IonicPage()
@Component({
  selector: 'page-successful-payment',
  templateUrl: 'successful-payment.html',
})
export class SuccessfulPaymentPage implements OnInit {

  success: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public groceriesService: GroceriesService) {
  }

  ngOnInit(): void {
    this.success = this.navParams.get('success');
    if (this.success){
      this.groceriesService.deleteAll();
    }
  }

  closeModal() {
    const loading = this.loadingCtrl.create({
      content: 'Regresando...',
      duration: 100
    });

    loading.onDidDismiss(() => {
      this.viewCtrl.dismiss();
      this.navCtrl.push(TabsPage);
    });

    loading.present();

  }

}
