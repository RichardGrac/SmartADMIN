import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Irrigation} from "../../models/Irrigation";

@Injectable()
export class IrrigationDataProvider {

  irrigationDataCollection: AngularFirestoreCollection<any>;
  public currentUserUid;

  constructor(public http: HttpClient,
              public db: AngularFirestore) {
    this.irrigationDataCollection = this.db.collection('irrigation-data');
  }

  setUserId(userUid: string) {
    this.currentUserUid = userUid;
  }

  getIrrigationData(): AngularFirestoreDocument<Irrigation> {
    return this.irrigationDataCollection.doc(this.currentUserUid);
  }

  createIrrigationProfile() {
    const structure = {
      autoOff: false,
      autoOn: false,
      name: 'Mi Sistema',
      on: false,
      timeToAutoOff: '00:00',
      timeToAutoOn: '23:59'
    };

    return this.irrigationDataCollection
      .doc(this.currentUserUid).set(structure);
  }

  updateIrrigationValue(newObject: object){
    return this.irrigationDataCollection
      .doc(this.currentUserUid)
      .update(newObject);
  }

}
