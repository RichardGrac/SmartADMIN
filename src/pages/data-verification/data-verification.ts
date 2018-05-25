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
import {ServicesApiProvider} from '../../providers/services-api/services-api';
import {ServicePaymentsService} from "../../services/servicePayments";


@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html',
})
export class  DataVerificationPage implements OnInit{
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
              public alertCtrl: AlertController,
              public servicesApiProvider: ServicesApiProvider,
              public servicePaymentsService: ServicePaymentsService) {
  }


  ngOnInit(): void {
    this.kind_operation = this.navParams.get("operation");
    console.log('kind of operation: ' + this.kind_operation);
  }

  openModal(success: boolean) {
    console.log("openModal()");
    let status;
    const loading1 = this.loadingCtrl.create({
      content: 'Realizando pago...',
      // duration: 6000,
    });

    loading1.setSpinner('dots');
    loading1.present().then(() => {
      console.log("presenting loader...");

      if (this.kind_operation == "isPayingAService"){
        // Last Service added.
        let ls = this.servicePaymentsService.getLastService();
        this.servicesApiProvider.registerPayment
        (ls.card_number, 'Ricardo Daniel Garcia Navarro', ls.amount, ls.operation_name, ls.company)
          .subscribe(
            (data: any) => {
              status = data.status;
              // console.log(data.status);
              console.log('API Payments done: ', status);
              loading1.dismiss();
              this.requestDone(status, success);
            },
            (error) => {console.log('[API] Error registering payment ' + error);}
          )
        ;
        //
      }else{
        loading1.dismiss();
        let modal = this.modalCtrl.create(SuccessfulPaymentPage, {success: success});
        modal.present();
      }
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

  private requestDone(status: boolean, success: boolean) {
    if(status){
      let modal = this.modalCtrl.create(SuccessfulPaymentPage, {success: success});
      modal.present();
    }else{
      console.log("Error registering payment on data-verification.ts");
      this.navCtrl.popToRoot();
    }
  }
}
