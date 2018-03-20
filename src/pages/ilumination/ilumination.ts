import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})
export class IluminationPage {

  ilumination: Array<any> = [
    {
      place: 'Cocina',
      lights: [{
        name: "Principal",
        on: true
      },
        {
          name: "Cocineta",
          on: true
        },
        {
          name: "Lavatrastes",
          on: true
        }]
    },
    {
      place: 'Comedor',
      lights: [{
        name: "Central",
        on: false
      },
        {
          name: "Secundario",
          on: true
        }]
    },
    {
      place: 'Sala',
      lights: [{
        name: "General",
        on: true
        },
        {
          name: "Tenúe",
          on: false
        },
        {
          name: "Lámpara",
          on: false
        }]
    }
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IluminationPage');
  }

  changeStatus(id_place: number, id_light: number){
    var status = this.ilumination[id_place].lights[id_light].on;
    this.ilumination[id_place].lights[id_light].on = !(status);

}

}
