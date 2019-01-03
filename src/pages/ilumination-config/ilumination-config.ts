import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {LightsDataProvider} from "../../providers/lights-data/lights-data";

@IonicPage()
@Component({
  selector: 'page-ilumination-config',
  templateUrl: 'ilumination-config.html',
})
export class IluminationConfigPage implements OnInit {

  idPlace: string;
  placeName: string;
  light: any;

  public event = {
    timeToAutoOn: '00:00',
    timeToAutoOff: '00:00'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public lightsData: LightsDataProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.light = this.navParams.get('light');
    this.idPlace = this.navParams.get('idPlace');
    this.placeName = this.navParams.get('placeName');
    this.getTimes();
  }

  private getTimes() {
    this.event.timeToAutoOn = this.light.timeToAutoOn;
    this.event.timeToAutoOff = this.light.timeToAutoOff;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  toggleChange(band: number) {
    let loading1 = this.loadingCtrl.create({
      content: 'Estableciendo estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      if (band == 1) {
        this.lightsData.updateLightValue(this.idPlace, this.light.idLight, {auto_on: !this.light.auto_on})
          .then(() => {
            // Local Change
            this.light.auto_on = !this.light.auto_on;
            loading1.dismiss()
          })
      } else {
        this.lightsData.updateLightValue(this.idPlace, this.light.idLight, {auto_off: !this.light.auto_off})
          .then(() => {
            // Local Change
            this.light.auto_off = !this.light.auto_off;
            loading1.dismiss()
          })
      }
    });
  }

  changeLightName() {
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
          handler: () => {
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
                  this.lightsData.updateLightValue(this.idPlace, this.light.idLight, {name: data.name})
                    .then(() => {
                      // Local Change
                      this.light.name = data.name;
                      loading1.dismiss();
                      this.showToastMessage('Nombre cambiado exitosamente!')
                    });
                });
            }
          }
        }]
    });
    prompt.present();
  }

  onChangeStatus() {
    this.lightsData.updateStatusOnFirebaseRTDB(this.light.idLight, !this.light.on)
      .then(() => {
        // Do the same change but in Firestore
        this.lightsData.updateLightValue(this.idPlace, this.light.idLight, { on: !this.light.on })
          .then(() => {
            // Local Change
            this.light.on = !this.light.on;
            this.showToastMessage('¡Estado cambiado exitosamente!')
          })
      });

  }

  changeTimeStarts() {
    let loading1 = this.loadingCtrl.create({
      content: 'Estableciendo hora...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(()=> {
      this.lightsData.updateLightValue(this.idPlace, this.light.idLight, {timeToAutoOn: this.event.timeToAutoOn})
        .then(() => {
          this.showToastMessage('¡Hora establecida exitosamente!');
          // No local change needed.
          loading1.dismiss();
        })
    });
  }

  changeTimeEnds() {
    let loading1 = this.loadingCtrl.create({
      content: 'Estableciendo hora...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(()=> {
      this.lightsData.updateLightValue(this.idPlace, this.light.idLight, {timeToAutoOff: this.event.timeToAutoOff})
        .then(() => {
          this.showToastMessage('¡Hora establecida exitosamente!');
          // No local change needed.
          loading1.dismiss();
        })
    });
  }

  onDeleteThisLight () {
    this.lightsData.deleteALightFromRTDB(this.light.idLight)
      .then(() => {
        // The same but in Firestore
        this.lightsData.deleteALight(this.idPlace, this.light.idLight)
          .then(() => {
            this.showToastMessage('Item eliminado correctamente');
            this.navCtrl.pop();
          })
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
