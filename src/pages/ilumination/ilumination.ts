import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfPage} from "../ilumination-conf/ilumination-conf";

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

  presentModal(index: number){
    let modal = this.modalCtrl.create(IluminationConfPage);
    modal.present();
  }
}
