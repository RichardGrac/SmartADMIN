import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";


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
              public loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.success = this.navParams.get('success');
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
