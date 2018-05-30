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
import {Place} from "../../models/Place";
import {FirestoreProvider} from "../../providers/firestore/firestore";

@IonicPage()
@Component({
  selector: 'page-ilumination-config',
  templateUrl: 'ilumination-config.html',
})
export class IluminationConfigPage implements OnInit {

  place: Place;
  id_place: number;
  id_light: number;

  public event = {
    timeStarts: '00:00',
    timeEnds: '00:00'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public firestoreProvider: FirestoreProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.place = this.navParams.get('place');
    this.id_place = this.navParams.get('id_place');
    this.id_light = this.navParams.get('id_light');
    this.getTimes();
  }

  private getTimes() {
    this.event.timeStarts = this.place.lights[this.id_light].timeStarts;
    this.event.timeEnds = this.place.lights[this.id_light].timeEnds;
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
        this.firestoreProvider.setAutoOn({idplace: this.id_place, idlight: this.id_light})
          .subscribe(() => {
            // Local Change
            let aux = this.place.lights[this.id_light].auto_on;
            this.place.lights[this.id_light].auto_on = !(aux);
            loading1.dismiss()
          })
      } else {
        this.firestoreProvider.setAutoOff({idplace: this.id_place, idlight: this.id_light})
          .subscribe(() => {
            // Local Change
            let aux = this.place.lights[this.id_light].auto_off;
            this.place.lights[this.id_light].auto_off = !(aux);
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
                  this.firestoreProvider.setName({idplace: this.id_place, idlight: this.id_light, name: data.name})
                    .subscribe(() => {
                      console.log('Nombre cambiado');
                      // Local Change
                      this.place.lights[this.id_light].name = data.name;
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
    this.firestoreProvider.setStatus({idplace: this.id_place, idlight: this.id_light})
      .subscribe(() => {
        var aux = this.place.lights[this.id_light].on;
        // Local Change
        this.place.lights[this.id_light].on = !(aux);
        this.showToastMessage('¡Estado cambiado exitosamente!')
      });
  }

  changeTimeStarts() {
    let loading1 = this.loadingCtrl.create({
      content: 'Estableciendo hora...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(()=> {
      this.firestoreProvider.changeTimeStarts({idplace: this.id_place, idlight: this.id_light, timeStarts: this.event.timeStarts})
        .subscribe(() => {
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
      this.firestoreProvider.changeTimeEnds({idplace: this.id_place, idlight: this.id_light, timeStarts: this.event.timeEnds})
        .subscribe(() => {
          this.showToastMessage('¡Hora establecida exitosamente!');
          // No local change needed.
          loading1.dismiss();
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
