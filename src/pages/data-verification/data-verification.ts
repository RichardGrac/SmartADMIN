import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {SuccessfulPaymentPage} from "../successful-payment/successful-payment";


@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html',
})
export class DataVerificationPage {
  termination: number = 321;
  card_type: string = 'Visa';
  date: string = '02/19';
  owner: string = 'Ricardo Daniel García Navarro';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController) {
  }

  openModal(success: boolean) {

    const loading1 = this.loadingCtrl.create({
      content: 'Paso 1: Verificando Datos',
      duration: 6000,
    });

    loading1.setSpinner('dots');
    loading1.present().then(() => {

      setTimeout(function () {
        loading1.setContent('Paso 2: Realizando Pedido');
      }, 2600);

    }).then(() => {
      setTimeout(function () {
        loading1.setContent('Paso 3: Esperando Respuesta');
      }, 4000);
    });

    loading1.onDidDismiss(() => {
      let modal = this.modalCtrl.create(SuccessfulPaymentPage, {success: success});
      modal.present();
    });

  }

}
