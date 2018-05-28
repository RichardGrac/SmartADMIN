import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfigPage} from "../ilumination-config/ilumination-config";
import { Observable } from 'rxjs/Observable';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import {Place} from "../../models/Place";

@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})
export class IluminationPage {
  ilumination: any[];
  public places: Observable<Place[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lightsService: LightsService,
              public popoverCtrl: PopoverController,
              public firestoreProvider: FirestoreProvider,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.places = this.firestoreProvider.getSongList().valueChanges();
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
