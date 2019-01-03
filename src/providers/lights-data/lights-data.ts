import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import uniqid from "uniqid";

import * as firebase from "firebase/app";
import config from '../../app/app.module'

@Injectable()
export class LightsDataProvider {

  lightsDataCollection: AngularFirestoreCollection<any>;
  realTimeDB: any;
  currentUserUid;

  placesCollection = 'places';
  lightsCollection = 'lights';

  constructor(public http: HttpClient,
              public db: AngularFirestore) {
    this.lightsDataCollection = this.db.collection('lights-data');
    this.realTimeDB = firebase.initializeApp(config, 'Real Time DB Reference');
  }

  setUserId(userUid: string) {
    this.currentUserUid = userUid;
  }

  getPlaceList() {
    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
  }

  addNewPlace(placeName: string) {
    const idPlace = uniqid();
    const placeStructure =  {
      idPlace: idPlace,
      placeName: placeName
    };

    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
      .doc(idPlace).set(placeStructure);
  }

  createLightId() {
    return uniqid();
  }

  addNewLight(idPlace: string, name: string, idLight: string) {
    const lightStructure = {
      idLight,
      autoOff: false,
      autoOn: false,
      name,
      on: false,
      timeToAutoOff: '00:00',
      timeToAutoOn: '23:59'
    };

    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
      .doc(idPlace).collection(this.lightsCollection)
      .doc(idLight).set(lightStructure);
  }

  addNewLightInRTDB (lightId: string, placeId: string) {
    const obj = {
      status: 0,
      userId: this.currentUserUid,
      placeId: placeId
    }
    return firebase.database().ref(`${lightId}`)
      .set(obj);
  }

  getLightList(idPlace: string) {
    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
      .doc(idPlace).collection(this.lightsCollection)
  }

  updateLightValue(placeId: string, lightId: string, newObject: object) {
    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
      .doc(placeId).collection(this.lightsCollection)
      .doc(lightId).update(newObject);
  }

  updateStatusOnFirebaseRTDB(lightId: string, newStatus: boolean) {
    const status = newStatus === true ? 1 : 0
    const obj = { status };

    return firebase.database().ref(`${lightId}/status`)
      .set(status);
  }

  deleteALight(placeId: string, lightId: string) {
    return this.lightsDataCollection
      .doc(this.currentUserUid).collection(this.placesCollection)
      .doc(placeId).collection(this.lightsCollection)
      .doc(lightId).delete();
  }

  deleteALightFromRTDB(lightId: string) {
    return firebase.database().ref(`${lightId}`)
      .remove()
  }
}
