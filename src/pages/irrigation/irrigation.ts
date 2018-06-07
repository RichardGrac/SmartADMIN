import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {IrrigationProvider} from "../../providers/irrigation/irrigation";
import {Irrigation} from "../../models/Irrigation";

@IonicPage()
@Component({
  selector: 'page-irrigation',
  templateUrl: 'irrigation.html',
})
export class IrrigationPage {
  object: Irrigation[];

  idsystem: number = 0;
  name: string;
  isOn: boolean;
  isAutoOn: boolean;
  isAutoOff: boolean;


  public event = {
    timeStarts: '00:00',
    timeEnds: '23:59'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public irrigationProvider: IrrigationProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading1 = this.loadingCtrl.create({
      content: 'Obteniendo información...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.getIrrigationList().valueChanges()
        .subscribe(data => {
          this.name = data[0].name;
          this.isOn = data[0].isOn;
          this.isAutoOn = data[0].isAutoOn;
          this.isAutoOff = data[0].isAutoOff;
          this.event.timeStarts = data[0].timeStarts;
          this.event.timeEnds = data[0].timeEnds;
          loading1.dismiss();
        });
    });
  }

  onChangeState() {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.setStatus({idsystem: this.idsystem})
        .subscribe(() => {
          console.log('Status Changed');
          this.isOn = !(this.isOn);
          loading1.dismiss();
        });
    });
  }

  onSetAutoOn() {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.setAutoOn({idsystem: this.idsystem})
        .subscribe(() => {
          console.log('Auto On applied');
          loading1.dismiss();
        });
    });
  }

  onSetAutoOff() {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.setAutoOff({idsystem: this.idsystem})
        .subscribe(() => {
          console.log('Auto Off applied');
          loading1.dismiss();
        });
    });
  }

  onChangeName() {
    let prompt = this.alertCtrl.create({
      title: 'Editar nombre',
      message: "Introduzca el nuevo nombre",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            return;
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.showToastMessage('Por favor ingrese un valor valido');
            } else {
              let loading1 = this.loadingCtrl.create({
                content: 'Realizando cambio...',
                enableBackdropDismiss: false,
                spinner: 'dots'
              });

              loading1.present()
                .then(() => {
                  this.irrigationProvider.setName({idsystem: this.idsystem, name: data.name})
                    .subscribe(() => {
                      console.log('Nombre cambiado');
                      loading1.dismiss();
                      this.showToastMessage('Nombre cambiado exitosamente!');
                      this.name = data.name;
                    });
                });
            }
          }
        }]
    });
    prompt.present();
  }

  onChangeTimeStarts() {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de hora...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.changeTimeStarts({idsystem: this.idsystem, timeStarts: this.event.timeStarts})
        .subscribe(() => {
          console.log('TimeStarts changed');
          loading1.dismiss();
        });
    });
  }

  onChangeTimeEnds() {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de hora...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationProvider.changeTimeEnds({idsystem: this.idsystem, timeEnd: this.event.timeEnds})
        .subscribe(() => {
          console.log('TimeEnds changed');
          loading1.dismiss();
        });
    });
  }

  showToastMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }
}
