import {Grades} from "../models/grades";
import {WeatherProvider} from "../providers/weather/weather";
import {Component} from "@angular/core";

@Component({})

export class TemperaturesService {
  temperatures: Array<Grades> = [];
  established_temp: number = 15;
  isOn: boolean;
  realTempOfAgs;

  currentlyTemp: number;

  constructor(public weatherProvider: WeatherProvider) {
    this.getRealWeather();

    this.temperatures.push(new Grades("fourT", 14));
    this.temperatures.push(new Grades("fifT", 15));
    this.temperatures.push(new Grades("sixT", 16));
    this.temperatures.push(new Grades("sevenT", 17));
    this.temperatures.push(new Grades("eightT", 18));
    this.temperatures.push(new Grades("nineT", 19));
    this.temperatures.push(new Grades("twenty", 20));
    this.temperatures.push(new Grades("tOne", 21));
    this.temperatures.push(new Grades("tTwo", 22));
    this.temperatures.push(new Grades("tThree", 23));
    this.temperatures.push(new Grades("tFour", 24));
  }

  getTemperatures() {
    return this.temperatures.slice();
  }

  getEstablishedTemp() {
    return this.established_temp;
  }

  getCurrentlyTemp() {
    return this.currentlyTemp;
  }

  setEstablishedTemp(temp: number) {
    this.established_temp = temp;
  }

  getIsOn() {
    return this.isOn;
  }

  setIsOn(state: boolean) {
    this.isOn = state;
  }

  public getRealWeather() {
    if (this.realTempOfAgs == null) {
      this.realTempOfAgs = this.weatherProvider.getWeather()
        .subscribe((data: any) => {
          console.log('Real time of Aguascalientes: ', data);
          // Kelvin to Celsius:
          this.currentlyTemp = data.main.temp - 273.15;
        });
    }
  }

}
