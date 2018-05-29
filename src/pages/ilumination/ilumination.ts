import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import {LightsService} from "../../services/lights";
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfigPage} from "../ilumination-config/ilumination-config";
import { Observable } from 'rxjs/Observable';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import {Place, PlaceId} from "../../models/Place";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})
export class IluminationPage {
  ilumination: any[];
  public places: Observable<PlaceId[]>;

  shirts: Observable<PlaceId[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lightsService: LightsService,
              public popoverCtrl: PopoverController,
              public firestoreProvider: FirestoreProvider,
              private readonly afs: AngularFirestore,
              public modalCtrl: ModalController) {
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.places = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Place;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  ionViewDidLoad() {
    this.places = this.firestoreProvider.getPlaceList().valueChanges();
  }

  changeStatus(_data){
    // let data = {
    //   idlight: j,
    //   idplace: i
    // }
    this.firestoreProvider.setStatus(_data)
    // this.lightsService.changeStatus(i, j);
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
