import {Component, ViewChild} from '@angular/core';
import {MenuController, ModalController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {FirebaseAuthProvider} from "../providers/firebase-auth/firebase-auth";
import {UserDataProvider} from "../providers/user-data/user-data";
import {TermsAndConditionsPage} from "../pages/terms-and-conditions/terms-and-conditions";
import {AboutUsPage} from "../pages/about-us/about-us";
import {PaymentPlansPage} from '../pages/payment-plans/payment-plans';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  termsAndConditionsPage:any = TermsAndConditionsPage;
  aboutUsPage:any = AboutUsPage;
  paymentPlansPage:any = PaymentPlansPage;

  public isAuthenticated = false;

  // We reference #nav from app.html
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: FirebaseAuthProvider,
              private userDataProvider: UserDataProvider,
              private modalCtrl: ModalController
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#0984e3");
      splashScreen.hide(); // <-- hide static image
    });

    try {
      this.authService.onAuthStateChanged().onAuthStateChanged(user => {
        if(user) {
          this.userDataProvider.setUserId(user.uid);
          this.isAuthenticated = true;
          this.nav.setRoot(this.homePage);
        } else {
          this.isAuthenticated = false;
        }
      })
    }catch (e) {
      console.error(e);
    }
    // fireAuth.auth.signInAnonymously()
    //   .then(() => { console.log('signInAnonymously success') })
  }

  onLoadPage (pageToLoad: any) {
    this.nav.setRoot(pageToLoad);
    this.menuCtrl.close();
  }

  onLoadTaC() {
    let modal = this.modalCtrl.create(this.termsAndConditionsPage);
    modal.present();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }

}
