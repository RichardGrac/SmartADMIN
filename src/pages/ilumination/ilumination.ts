import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LightsService} from "../../services/lights";

@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})
export class IluminationPage implements OnInit{
  ilumination: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lightsService: LightsService) {
  }

  ngOnInit(): void {
    this.ilumination = this.lightsService.getItems();
  }

  changeStatus(i, j){
    this.lightsService.changeStatus(i, j);
  }
}
