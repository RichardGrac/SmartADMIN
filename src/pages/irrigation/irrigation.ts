import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Irrigation} from "../../models/Irrigation";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {IrrigationDataProvider} from "../../providers/irrigation-data/irrigation-data";
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-irrigation',
  templateUrl: 'irrigation.html',
})
export class IrrigationPage implements OnInit, OnDestroy {

  irrigationObj: Irrigation = null;
  public irrigationSubscription: Subscription;

  public event = {
    timeToAutoOff: '00:00',
    timeToAutoOn: '23:59'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public userData: UserDataProvider,
              public irrigationData: IrrigationDataProvider) {
  }


  ngOnInit(): void {
    const loading1 = this.loadingCtrl.create({
      content: 'Obteniendo información...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationData.setUserId(this.userData.currentUserUid);
      this.irrigationSubscription = this.irrigationData.getIrrigationData()
        .valueChanges()
        .subscribe(data => {
          if(data === undefined){
            this.irrigationData.createIrrigationProfile();
          } else {
            this.irrigationObj = data;
            this.event.timeToAutoOff = data.timeToAutoOff;
            this.event.timeToAutoOn = data.timeToAutoOn;
            loading1.dismiss();
          }
        });
    });
  }

  updateValue(loadingMessage = 'Cambiando estado...', errorMessage = '¡Ops! Ocurrió un error'){
    let loading1 = this.loadingCtrl.create({
      content: loadingMessage,
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.irrigationData.updateIrrigationValue(this.irrigationObj)
        .then(() => {
          loading1.dismiss();
        })
        .catch(() => {
          this.showToastMessage(errorMessage);
          loading1.dismiss();
        });
    });
  }

  onChangeState() {
    this.irrigationObj.on = !this.irrigationObj.on;
    this.updateValue();
  }

  onSetAutoOn() {
    this.irrigationObj.autoOn = !this.irrigationObj.autoOn;
    this.updateValue();
  }

  onSetAutoOff() {
    this.irrigationObj.autoOff = !this.irrigationObj.autoOff;
    this.updateValue();
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
              // @ts-ignore
              this.irrigationObj.name = data.name;
              this.updateValue('Realizando cambio...');
            }
          }
        }]
    });
    prompt.present();
  }

  onChangeTimeStarts() {
    this.irrigationObj.timeToAutoOn = this.event.timeToAutoOn;
    this.updateValue('Cambiando de hora...');
  }

  onChangeTimeEnds() {
    this.irrigationObj.timeToAutoOff = this.event.timeToAutoOff;
    this.updateValue('Cambiando de hora...');
  }

  showToastMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }

  ngOnDestroy(): void {
    this.irrigationSubscription.unsubscribe();
  }
}
