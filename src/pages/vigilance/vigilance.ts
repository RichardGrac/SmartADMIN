import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CamerasService} from "../../services/cameras";
import {CameraPage} from "../camera/camera";

@IonicPage()
@Component({
  selector: 'page-vigilance',
  templateUrl: 'vigilance.html',
})
export class VigilancePage implements OnInit{

  vigilance: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vigilanceService: CamerasService) {
  }

  ngOnInit(): void {
    this.vigilance = this.vigilanceService.getVigilanceItems();
  }

  openCamera(place: string, id_place: number, id_camera: number){
     this.navCtrl.push(CameraPage, {place: place, id_place: id_place, id_camera: id_camera});
  }

}
