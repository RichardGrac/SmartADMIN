import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfigPage} from "../ilumination-config/ilumination-config";

@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})
export class IluminationPage implements OnInit{
  ilumination: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lightsService: LightsService,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.ilumination = this.lightsService.getItems();
  }

  changeStatus(i, j){
    this.lightsService.changeStatus(i, j);
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverInfoComponent);
    popover.present({
      ev: ev
    });
  }

  presentModal(id_place: number, id_light: number){
    let modal = this.modalCtrl.create(IluminationConfigPage, {id_place: id_place, id_light: id_light});
    modal.present();
  }
}
