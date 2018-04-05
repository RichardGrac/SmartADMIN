import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CamerasService} from "../../services/cameras";

@IonicPage()
@Component({
  selector: 'page-vigilance',
  templateUrl: 'vigilance.html',
})
export class VigilancePage implements OnInit{

  vigilance: any[];
  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 33, upper: 60 };
  text: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vigilanceService: CamerasService) {
  }

  ngOnInit(): void {
    this.vigilance = this.vigilanceService.getVigilanceItems();
  }



}
