import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Store} from "../../models/stores";
import {StoresService} from "../../services/stores";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Payment} from "../../models/Payment";

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  companies: Store[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public companiesService: StoresService,
              private barcodeScanner: BarcodeScanner,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
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
      var response = this.validateBarcodeData(barcodeData.text);
      console.log(response);
      if (response != null) {
        this.showConfirm(response);
      } else {
        this.showAlert();
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  validateBarcodeData(barcodeData: string) {
    var payment = null;
    let loader = this.loadingCtrl.create({
      content: "Verificando código...",
      duration: 1500
    });

    if (barcodeData == "0078980000000034500") {
      // Water service
      payment = new Payment("Cobro servicio de agua parcial abril-mayo", 345.00, "*** *321",
        "PROACTIVA MEDIOAMBIENTE (CAASA)", new Date());
    } else if (barcodeData == "010980808076191712180000001240") {
      // Electrical service
      payment = new Payment("Cobro luz eléctrica periodo enero-marzo", 124.00, "*** *321",
        "COMISIÓN FEDERAL DE ELECTRICIDAD (CFE)", new Date());
    }

    loader.present();
    return payment;
  }

  showConfirm(response: Payment) {
    let confirm = this.alertCtrl.create({
      title: response.company,
      enableBackdropDismiss: false,
      subTitle: 'Operación: \"' + response.operation_name + '\" ($' + response.amount + ' MXN)',
      message: '¿DESEAS PAGAR EL SERVICIO IDENTIFICADO?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar clickeado');
          }
        },
        {
          text: 'Aceptar pago',
          handler: () => {
            console.log('Aceptar clickeado');
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
}
