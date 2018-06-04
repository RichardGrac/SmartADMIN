import {Component, Pipe, PipeTransform} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Grades} from "../../models/grades";
import {TemperaturesService} from "../../services/temperatures";
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/timer";
import "rxjs-compat/add/operator/take";
import "rxjs-compat/add/operator/map";

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

  countDown;
  estimatedTime: number;
  tick = 1000;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public temperaturesService: TemperaturesService) {
    this.temperatures = temperaturesService.getTemperatures();
    this.establishedTN = temperaturesService.getEstablishedTemp();
    this.isOn = temperaturesService.getIsOn();
    this.currentlyTN = temperaturesService.getCurrentlyTemp();
    this.getTemperatureColor();
    this.calcTime();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturePage');
  }

  getTemperatureColor() {
    if (this.currentlyTN < 14) {
      this.currentlyTS = "fourT";
    } else if (this.currentlyTN > 24) {
      this.currentlyTS = "tFour";
    }else{
      this.currentlyTS = this.getTempStringColor(this.currentlyTN);
    }
    this.establishedTS = this.getTempStringColor(this.establishedTN);
    this.temperaturesService.setEstablishedTemp(this.establishedTN);
  }

  getTempStringColor(temperature){
    let aux;
    for (let i = 0; i < this.temperatures.length; i++) {
      if (this.temperatures[i].getValue() == temperature) {
        aux = this.temperatures[i].getName();
        break;
      }
    }
    return aux;
  }

  onChangeSlide(){
    this.getTemperatureColor();
    this.calcTime();
  }

  onChangeToggle() {
    console.log("onChangeToggle()");
    this.isOn = !(this.isOn);
    this.temperaturesService.setIsOn(this.isOn);
    this.getTemperatureColor();
    this.calcTime();
  }

  calcTime() {
    console.log('--calcTime()');
    let difference = this.currentlyTN - this.establishedTN;
    //If the difference is a negative number, we make it positive
    if (difference < 0) {
      difference = (difference * (-1));
    }
    // 2 minutes per grade per 60 seconds each minute.
    this.estimatedTime = (2 * difference) * 60;

    // Setting up the countdown
    this.countDown = Observable.timer(0, this.tick)
      .take(this.estimatedTime)
      .map(() => --this.estimatedTime);
  }
}

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

}

