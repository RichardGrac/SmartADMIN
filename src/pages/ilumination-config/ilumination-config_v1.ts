/*import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import { FirestoreProvider } from '../../providers/firestore/firestore';


@IonicPage()
@Component({
  selector: 'page-ilumination-config',
  templateUrl: 'ilumination-config.html',
})
export class IluminationConfigPage implements OnInit{

  light: any;
  index_light: number;

  public event = {
    timeStarts: '00:00',
    timeEnds: '00:00'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lightsService: LightsService,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public firestoreProvider: FirestoreProvider,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.getLightObject();
    this.index_light = this.navParams.get('id_light');
    this.getTimes();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  getLightObject(){
    // this.light = this.lightsService.getLightInfo(this.navParams.get('id_place'));
    // this.placeDoc = this.afs.collection('lights', ref => ref.where('id_place', '==', `${this.navParams.get('id_place')}`))
    this.light = this.navParams.get('place')
  }

  toggleChange(band: number, newStatus: boolean){
    if (band == 1){
      this.lightsService.setStatusAutoOn(this.light.id_place, this.index_light, newStatus);
    }else{
      this.lightsService.setStatusAutoOff(this.light.id_place, this.index_light, newStatus);
    }
    this.getLightObject();
  }

  private getTimes() {
    this.event.timeStarts = this.light.lights[this.index_light].timeStarts;
    this.event.timeEnds = this.light.lights[this.index_light].timeEnds;
  }

  changeLightName(){
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
            if(data.name.trim() == '' || data.name == null){
              this.showToastMessage('Por favor ingrese un valor valido');
            }else{
              let payload = {
                idplace: this.light.id_place,
                idlight: this.index_light,
                name: data.name
              }
              this.firestoreProvider.setName(payload);
              this.getLightObject();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeStatus(id_place: number, id_light: number){
    let data = {
      idplace: id_place,
      idlight: id_light
    }
    this.firestoreProvider.setStatus(data)
    // this.lightsService.changeStatus(id_place, id_light);
  }

  changeTimeStarts(){
    let payload = {
      idplace: this.light.id_place,
      idlight: this.index_light,
      timeStart: this.event.timeStarts
    }
    // this.lightsService.changeTimeStarts(this.light.id_place, this.index_light, this.event.timeStarts);
    this.firestoreProvider.changeTimeStarts(payload)
  }

  changeTimeEnds(){
    let payload = {
      idplace: this.light.id_place,
      idlight: this.index_light,
      timeEnd: this.event.timeEnds
    }
    // this.lightsService.changeTimeEnds(this.light.id_place, this.index_light, this.event.timeEnds);
    this.firestoreProvider.changeTimeEnds(payload)
  }

  showToastMessage(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }
}
*/
