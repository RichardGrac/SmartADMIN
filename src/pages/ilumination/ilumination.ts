import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  ModalController,
  LoadingController
} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfigPage} from "../ilumination-config/ilumination-config";
import {Observable} from 'rxjs/Observable';
import {FirestoreProvider} from '../../providers/firestore/firestore';
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
              public loadingCtrl: LoadingController,
              public firestoreProvider: FirestoreProvider,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    /* Redundant spinner because I'm asking twice to the "getPlaceList()", but it works. */
    let loading1 = this.loadingCtrl.create({
      content: 'Obteniendo información...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.firestoreProvider.getPlaceList().valueChanges()
        .subscribe(() => {
          this.places = this.firestoreProvider.getPlaceList().valueChanges();
          loading1.dismiss();
        });
    });
  }

  changeStatus(i, j) {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    let data = {
      idlight: j,
      idplace: i
    };

    loading1.present().then(() => {
      this.firestoreProvider.setStatus(data).subscribe(() => {
        loading1.dismiss();
      })
    })
    // this.lightsService.changeStatus(i, j);
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverInfoComponent);
    popover.present({
      ev: ev
    });
  }

  presentModal(id_place: number, id_light: number, place: Place) {
    let modal = this.modalCtrl.create(IluminationConfigPage, {id_place: id_place, id_light: id_light, place: place});
    modal.present();
  }
}
