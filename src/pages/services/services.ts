import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Store} from "../../models/stores";
import {StoresService} from "../../services/stores";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Payment} from "../../models/Payment";
// import {AuthenticationPage} from "../authentication/authentication";
import {ServicePaymentsService} from "../../services/servicePayments";
import {DataVerificationPage} from "../data-verification/data-verification";
import {ServicesApiProvider} from "../../providers/services-api/services-api";

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
              public modalCtrl: ModalController,
              public servicesApiProvider:ServicesApiProvider) {
  }

  ngOnInit(): void {
    this.companies = this.companiesService.getServicesCompanies();
  }

  /*
  * type_company: CFE=0, CAASA=1,...
  * */
  onOpenBarcodeLecture(type_company: number) {
    console.log("Reading barcode...");
    console.log("index: ", type_company);
    var options: BarcodeScannerOptions = {
      prompt: 'Escanea tu código de barras',
      showTorchButton: true

    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data text: ', barcodeData.text, " - barcode.format: ", barcodeData.format,
        " - barcode.cancelled: ", barcodeData.cancelled);

      // 'false' means that the User didn't click on 'Cancel' button
      if (barcodeData.cancelled == false){
        let loader = this.loadingCtrl.create({
          content: "Verificando código..."
        });
        loader.present().then(() =>{

          this.servicesApiProvider.verify_barcode(barcodeData.text, type_company.toString())
            .subscribe(
              (data) => {
                loader.dismiss();
                console.log("Code verified in Barcode's API: ", JSON.stringify(data));
                if (data.success == true) {
                  this.showConfirm(data);
                } else {
                  this.showAlert();
                }
                // console.log(data.status);
                // console.log('API Payments done: ', status);
              },
              (error) => {console.log('[API] Error registering payment ' + error);}
            )
          ;

        });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  savePayment(data:any){
    this.servicePaymentsService.addServiceByObject(
      new Payment(data.operation_name, data.amount, "**** *321", data.company, new Date())) ;
  }

  showConfirm(data: any) {
    let confirm = this.alertCtrl.create({
      title: data.company,
      enableBackdropDismiss: false,
      subTitle: data.name + '. Operación: \"' + data.operation_name + '\" ($' + data.amount + ' MXN)',
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
            console.log('Accept clicked');
            this.savePayment(data);
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
        // this.createPaymentInfo();
        this.verificationPage();
      }else{
        console.log(data.error_code);
      }
    });
  }

  // private createPaymentInfo() {
  //   console.log("Creating payment info...");
  //   this.servicePaymentsService.addServiceByObject(this.payment);
  // }

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
