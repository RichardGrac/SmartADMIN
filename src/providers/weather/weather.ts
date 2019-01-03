import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {

  /*
  * username: richard_grac
  * fake email: Emaked1934@dayrep.com
  * password: Super2017.
  * Provider: https://home.openweathermap.org/users
  * */

  apiKey= "07829459d3efbcd38fafc80cabf74d30";

  constructor(public http: HttpClient) {}

  getWeather(){
    return this.http
      .get("http://api.openweathermap.org/data/2.5/weather?q=Aguascalientes,MEX&APPID=07829459d3efbcd38fafc80cabf74d30");
  }
}
