import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IluminationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        name: "Foco #1",
        on: true
      },
        {
          name: "Foco #2",
          on: true
        },
        {
          name: "Foco #3",
          on: true
        }]
    },
    {
      place: 'Comedor',
      lights: [{
        name: "Foco #1",
        on: false
      },
        {
          name: "Foco #2",
          on: true
        }]
    },
    {
      place: 'Sala',
      lights: [{
        name: "Foco #1",
        on: true
        },
        {
          name: "Foco #2",
          on: false
        },
        {
          name: "Foco #3",
          on: false
        }]
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IluminationPage');
  }

  changeStatus(id_place: number, id_light: number){
    var status = this.ilumination[id_place].lights[id_light].on;
    this.ilumination[id_place].lights[id_light].on = !(status);

}

}
