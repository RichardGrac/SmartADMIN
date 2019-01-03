import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class FirebaseAuthProvider {

  constructor(public afAuth: AngularFireAuth) {}

  onAuthStateChanged() {
    return firebase.auth();
  }

  signup(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(){
    firebase.auth().signOut();
  }

  getActiveUser(){
    return firebase.auth().currentUser;
  }

}
