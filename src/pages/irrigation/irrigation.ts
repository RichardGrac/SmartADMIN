import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Light} from "../../models/Place";
import {IrrigationProvider} from "../../providers/irrigation/irrigation";
import {Observable} from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-irrigation',
  templateUrl: 'irrigation.html',
})
export class IrrigationPage implements OnInit {

  irrigation: Observable<Light[]>;
  idsystem: number = 0;
  name: string = "Riego";
  isOn: boolean = false;
  isAutoOn: boolean = false;
  isAutoOff: boolean = false;

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

  ngOnInit(): void {
    this.irrigationProvider.getIrrigationInfo().valueChanges()
      .subscribe(() => {
        this.irrigation = this.irrigationProvider.getIrrigationInfo().valueChanges();

        this.name = this.irrigation[0].name;
        this.isOn = this.irrigation[0].isOn;
        this.isAutoOn = this.irrigation[0].isAutoOn;
        this.isAutoOff = this.irrigation[0].isAutoOff;
        this.event.timeStarts = this.irrigation[0].timeStarts;
        this.event.timeEnds = this.irrigation[0].timeEnds;
      });
  }

  onChangeState() {
    this.irrigationProvider.setStatus({idsystem: this.idsystem})
      .subscribe(() => {
        console.log('Status Changed');
        this.isOn = !(this.isOn);
      });
  }

  onSetAutoOn() {
    this.irrigationProvider.setAutoOn({idsystem: this.idsystem})
      .subscribe(()=>{
        console.log('Auto On applied');
        this.isAutoOn = !(this.isAutoOn);
      });
  }

  onSetAutoOff(){
    this.irrigationProvider.setAutoOff({idsystem: this.idsystem})
      .subscribe(() => {
        console.log('Auto Off applied');
        this.isAutoOff = !(this.isAutoOff);
      });
  }

  onChangeName(){
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

  onChangeTimeStarts(){
    this.irrigationProvider.changeTimeStarts({idsystem: this.idsystem, timeStarts: this.event.timeStarts})
      .subscribe(() => {
        console.log('TimeStarts changed');
      });
  }

  onChangeTimeEnds(){
    this.irrigationProvider.changeTimeEnds({idsystem: this.idsystem, timeEnd: this.event.timeEnds})
      .subscribe(() => {
        console.log('TimeEnds changed');
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
