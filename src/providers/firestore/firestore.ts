import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Place, PlaceId} from "../../models/Place";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FirestoreProvider {

  private shirtCollection: AngularFirestoreCollection<Place>;

  constructor(
    public firestore: AngularFirestore,
    public http: HttpClient
  ) {
    console.log('Hello FirestoreProvider Provider');
  }

  getPlaceList(): AngularFirestoreCollection<Place> {
    return this.firestore.collection(`lights`);
  }

  setStatus(data) {
    console.log(data)
    // this.http.get(`http://192.168.137.1:5000/api/lights/${idplace}/${idlight}`)
    //   .subscribe(data => { console.log('complete')})
  }
}
