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
  currentlyTN: number;
  currentlyTS: string;

  isOn: boolean;
  estimatedTime: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public temperaturesService: TemperaturesService) {
    this.temperatures = temperaturesService.getTemperatures();
    this.establishedTN = temperaturesService.getEstablishedTemp();
    this.isOn = temperaturesService.getIsOn();
    this.currentlyTN = temperaturesService.getCurrentlyTemp();
    this.getTemperatureColor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturePage');
  }

  getTemperatureColor(){
    if (this.currentlyTN < 14){
      this.currentlyTS = "fourT";
    } else if(this.currentlyTN > 24){
      this.currentlyTS = "tFour";
    }

    for (let i = 0; i < this.temperatures.length; i++) {
      if(this.temperatures[i].getValue() == this.establishedTN){
        this.establishedTS = this.temperatures[i].getName();
        break;
      }
    }
    this.calcTime();
    this.temperaturesService.setEstablishedTemp(this.establishedTN);
  }

  onChangeToggle(){
    console.log("onChangeToggle()");
    this.isOn = !(this.isOn);
    this.temperaturesService.setIsOn(this.isOn);
  }

  calcTime(){
    let difference = this.currentlyTN - this.establishedTN;
    if(difference < 0){
      difference = (difference*(-1));
    }

    this.estimatedTime = (2 * difference);
  }
}

