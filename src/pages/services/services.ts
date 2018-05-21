import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Store} from "../../models/stores";
import {StoresService} from "../../services/stores";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Payment} from "../../models/Payment";
import {AuthenticationPage} from "../authentication/authentication";
import {ServicePaymentsService} from "../../services/servicePayments";
import {DataVerificationPage} from "../data-verification/data-verification";

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  companies: Store[];
  payment: Payment;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public companiesService: StoresService,
              private barcodeScanner: BarcodeScanner,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public servicePaymentsService:ServicePaymentsService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.companies = this.companiesService.getServicesCompanies();
  }

  onOpenBarcodeLecture(name: string) {
    console.log("Reading barcode...");
    var options: BarcodeScannerOptions = {
      prompt: 'Escanea tu código de barras',
      showTorchButton: true

    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data text: ', barcodeData.text, " - barcode.format: ", barcodeData.format,
        " - barcode.cancelled: ", barcodeData.cancelled);

      // 'false' means that the User clicked on 'Cancel' button
      if (barcodeData.cancelled == false){
        let loader = this.loadingCtrl.create({
          content: "Verificando código...",
          duration: 1000
        });
        loader.present();
        loader.onDidDismiss(()=>{

          this.payment = this.validateBarcodeData(barcodeData.text, name);
          console.log(this.payment);
          if (this.payment != null) {
            this.showConfirm();
          } else {
            this.showAlert();
          }

        });
      }


    }).catch(err => {
      console.log('Error', err);
    });
  }

  validateBarcodeData(barcodeData: string, name: string) {
    var payment = null;
    if (barcodeData == "0078980000000034500" && name == "CAASA") {
      // Water service
      payment = new Payment("Cobro servicio de agua parcial abril-mayo", 345.00, "*** *321",
        "PROACTIVA MEDIOAMBIENTE (CAASA)", new Date());
    } else if (barcodeData == "010980808076191712180000001240" && name == "CFE") {
      // Electrical service
      payment = new Payment("Cobro luz eléctrica periodo enero-marzo", 124.00, "*** *321",
        "COMISIÓN FEDERAL DE ELECTRICIDAD (CFE)", new Date());
    }
    return payment;
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.payment.company,
      enableBackdropDismiss: false,
      subTitle: 'Operación: \"' + this.payment.operation_name + '\" ($' + this.payment.amount + ' MXN)',
      message: '¿DESEAS PAGAR EL SERVICIO IDENTIFICADO?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar pago',
          handler: () => {
            console.log('Acept clicked');
            this.openAuthenticationModal();
            // this.showPayMode();
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '¡Error en verificación!',
      subTitle: 'El servicio no puede ser identificado, intente nuevamente.',
      buttons: ['OK']
    });
    alert.present();
  }

  openAuthenticationModal(){
    let modal = this.modalCtrl.create('AuthenticationPage');
    modal.present();

    modal.onDidDismiss(data => {
      if(data.successful_code == true){
        this.createPaymentInfo();
        this.verificationPage();
      }else{
        console.log(data.error_code);
      }
    });
  }

  private createPaymentInfo() {
    console.log("Creating payment info...");
    this.servicePaymentsService.addServiceByObject(this.payment);
  }

  verificationPage(){
    this.navCtrl.push(DataVerificationPage, {"operation": "isPayingAService"});
  }

  // private showPayMode  () {
  //   let confirm = this.alertCtrl.create({
  //     title: 'Tipo de pago',
  //     message: 'Por favor, eliga su modo de pago.',
  //     buttons: [
  //       {
  //         text: 'Pago parcial',
  //         handler: () => {
  //
  //         }
  //       },
  //       {
  //         text: 'Pago total',
  //         handler: () => {
  //           this.navCtrl.push(AuthenticationPage);
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }
}
