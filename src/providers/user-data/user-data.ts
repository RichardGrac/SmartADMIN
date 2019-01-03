import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

@Injectable()
export class UserDataProvider {

  userDataCollection: AngularFirestoreCollection<any>;
  public currentUserUid;

  constructor(public http: HttpClient,
              public db: AngularFirestore) {
    this.userDataCollection = this.db.collection('users-data');
  }

  setUserId(userUid: string) {
    this.currentUserUid = userUid;
  }

  createInitialProfile(name: string, lastname: string, email: string, userUid: string) {
    try {
      let userInfo = {
        name: name,
        lastname: lastname,
        email: email,
        userUid: userUid,
        signUpDate: new Date(),
        lastLogin: null,
        typeOfUser: 'BASIC_USER',
        customModules: [],
        configuration: {
          letterSize: 'Estandar',
          alternativeBackground: false,
          voiceGuide: false,
          notifications: true,
          language: 'Español',
          accessCode: 1234
        },
        payment: null,
        addressInfo: null
      };
      return this.userDataCollection.doc(userUid).set(userInfo);

    } catch (e) {
      console.error('ERROR: ', e.message)
    }
  }

  getUserById() {
    return this.userDataCollection.doc(this.currentUserUid);
  }

  registerLastLogin(userUid) {
    const lastLogin = {lastLogin: new Date()};
    this.userDataCollection.doc(userUid).update(lastLogin)
  }

  /*getUsers() {
    this.userDataCollection.valueChanges().subscribe(data => {
      console.log('Data from Firebase: ', data);
    });
  }*/

  updateUserData(newObject: object){
    return this.userDataCollection
      .doc(this.currentUserUid)
      .update(newObject);
  }

  updateUserConfiguration(newConfiguration: object) {
    return this.userDataCollection
      .doc(this.currentUserUid)
      .update({'configuration': newConfiguration});
  }
}
