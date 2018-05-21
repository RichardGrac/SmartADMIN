import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {SuccessfulPaymentPage} from "../successful-payment/successful-payment";


@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html',
})
export class DataVerificationPage implements OnInit{
  termination: number = 321;
  card_type: string = 'Visa';
  date: string = '02/19';
  owner: string = 'Ricardo Daniel García Navarro';

  kind_operation: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }


  ngOnInit(): void {
    this.kind_operation = this.navParams.get("operation");
    console.log('kind of operation: ' + this.kind_operation);
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

  showAddressConfirmation(success: boolean) {
    let prompt = this.alertCtrl.create({
      title: 'Dirección de envío',
      message: "Los productos serán envíados a la dirección que se tiene configurada.",
      cssClass: "global-font-16px",
      buttons: [
        {
          text: 'Ír a configuración',
          handler: data => {
            /* He/She wants to change the Address */
              this.navCtrl.parent.select(1);
          }
        },
        {
          text: 'Sí, continuar',
          handler: data => {
            /* If the Address Verification was correct. */
            this.openModal(success);
          }
        }
      ]
    });
    prompt.present();
  }

  /* To change the method of payment */
  onChangePayMethod() {
    this.navCtrl.parent.select(1);
  }
}
