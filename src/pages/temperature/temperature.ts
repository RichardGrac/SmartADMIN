import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Grades} from "../../models/grades";
import {TemperaturesService} from "../../services/temperatures";

@IonicPage()
@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html',
})
export class TemperaturePage {

  // Color names. They are defined in "variables.scss" file.
  temperatures: Array<Grades> = [];
  // Established Temperature (Numeric and String)
  establishedTN: number;
  establishedTS: string;
  // Currently Temperature (Numeric and String)
  currentlyTN: number = 14;
  currentlyTS: string = "fourT";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              temperaturesService: TemperaturesService) {
    this.temperatures = temperaturesService.getTemperatures();
    this.establishedTN = temperaturesService.getCurrentlyTemp();
    this.getTemperatureColor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturePage');
  }

  getTemperatureColor(){
    for (let i = 0; i < this.temperatures.length; i++) {
      if(this.temperatures[i].getValue() == this.establishedTN){
        this.establishedTS = this.temperatures[i].getName();
        break;
      }
    }
  }
}
