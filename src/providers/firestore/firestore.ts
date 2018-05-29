import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Place} from "../../models/Place";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FirestoreProvider {

  private API_URl: string = 'https://smart-admin-master.herokuapp.com'

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
    console.log('providerFirestore --- ', data)
    const { idplace, idlight } = data
    this.http.get(`${this.API_URl}/api/lights/${idplace}/${idlight}`)
      .subscribe(data => { console.log('complete')})
  }

  setName(data) {
    const { idplace, idlight, name } = data
    this.http.patch(`http://localhost:5000/api/lights/${idplace}/${idlight}`, {name: name})
      .subscribe(data => { console.log('complete') })
  }

  changeTimeStarts(data) {
    const { idplace, idlight, timeStart } = data
    this.http.patch(`http://localhost:5000/api/lights/${idplace}/${idlight}/timeStart`, {timeStart})
      .subscribe(data => { console.log('complete') })
  }

  changeTimeEnds(data) {
    const { idplace, idlight, timeEnd } = data
    this.http.patch(`http://localhost:5000/api/lights/${idplace}/${idlight}/timeEnd`, {timeEnd})
      .subscribe(data => { console.log('complete') })
  }
}
