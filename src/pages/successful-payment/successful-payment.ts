import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {GroceriesService} from "../../services/groceries";
import {ServicePaymentsService} from "../../services/servicePayments";
import {Payment} from "../../models/Payment";


@IonicPage()
@Component({
  selector: 'page-successful-payment',
  templateUrl: 'successful-payment.html',
})
export class SuccessfulPaymentPage implements OnInit {

  success: boolean;
  payment: Payment;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public groceriesService: GroceriesService,
              public servicePayment: ServicePaymentsService) {
  }

  ngOnInit(): void {
    // this.success = this.navParams.get('success');
    this.success = true;
    if (this.success){
      this.groceriesService.deleteAll();
      this.payment = this.servicePayment.getLastService();
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
