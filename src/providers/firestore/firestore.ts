import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Place} from "../../models/Place";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FirestoreProvider {

  private API_URl: string = 'https://smart-admin-master.herokuapp.com'
  // private API_URl: string = 'http://localhost:5000'

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
    const {idplace, idlight} = data
    return this.http.get(`${this.API_URl}/api/lights/${idplace}/${idlight}`)
  }

  // Misma lógica que 'setStatus()' (Invertir booleano)
  setAutoOn(data) {
    const {idplace, idlight} = data;
    return this.http.get(`${this.API_URl}/api/lights/${idplace}/${idlight}/autoon`);
  }

  // Misma lógica que 'setStatus()' (Invertir booleano)
  setAutoOff(data) {
    const {idplace, idlight} = data;
    return this.http.get(`${this.API_URl}/api/lights/${idplace}/${idlight}/autooff`);
  }

  // Seteo de string
  setName(data) {
    const {idplace, idlight, name} = data
    return this.http.patch(`${this.API_URl}/api/lights/${idplace}/${idlight}`, {name: name});
  }

  // Misma lógica de 'setName', es Update de string
  changeTimeStarts(data) {
    const {idplace, idlight, timeStarts} = data
    return this.http.patch(`${this.API_URl}/api/lights/${idplace}/${idlight}/timeStart`, {timeStart: timeStarts});
  }

  // Misma lógica de 'setName', es Update de string
  changeTimeEnds(data) {
    const {idplace, idlight, timeEnd} = data
    return this.http.patch(`${this.API_URl}/api/lights/${idplace}/${idlight}/timeEnd`, {timeEnd: timeEnd});
  }
}
