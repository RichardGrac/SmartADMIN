import {Grades} from "../models/grades";

export class TemperaturesService{
  temperatures: Array<Grades> = [];
  established_temp: number = 15;
  isOn: boolean;
  currentlyTemp: number = 33;

  constructor(){
    this.temperatures.push(new Grades("fourT",14));
    this.temperatures.push(new Grades("fifT",15));
    this.temperatures.push(new Grades("sixT",16));
    this.temperatures.push(new Grades("sevenT",17));
    this.temperatures.push(new Grades("eightT",18));
    this.temperatures.push(new Grades("nineT",19));
    this.temperatures.push(new Grades("twenty",20));
    this.temperatures.push(new Grades("tOne",21));
    this.temperatures.push(new Grades("tTwo",22));
    this.temperatures.push(new Grades("tThree",23));
    this.temperatures.push(new Grades("tFour",2));
  }

  getTemperatures(){
    return this.temperatures.slice();
  }

  getEstablishedTemp(){
    return this.established_temp;
  }

  getCurrentlyTemp(){
    return this.currentlyTemp;
  }

  setEstablishedTemp(temp: number){
    this.established_temp = temp;
  }

  getIsOn() {
    return this.isOn;
  }

  setIsOn(state: boolean){
    this.isOn = state;
  }
}
