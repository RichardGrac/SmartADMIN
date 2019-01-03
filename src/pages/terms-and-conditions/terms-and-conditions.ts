import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
}
