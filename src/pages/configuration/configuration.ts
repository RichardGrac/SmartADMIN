import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserDataProvider} from "../../providers/user-data/user-data";
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage implements OnInit, OnDestroy {

  userData: any = null;
  config: any = null;

  private userDataSubscription: Subscription;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userDataProvider: UserDataProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  ngOnInit(): void {
    const loading1 = this.loadingCtrl.create({
      content: 'Obteniendo información...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.userDataSubscription = this.userDataProvider.getUserById()
        .valueChanges()
        .subscribe(data => {
          this.userData = data;
          this.config = this.userData.configuration;
          loading1.dismiss();
        })
    });
  }

  updateValue(loadingMessage = 'Registrando cambio', errorMessage = '¡Ops! Ocurrió un error'){
    let loading1 = this.loadingCtrl.create({
      content: loadingMessage,
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.userDataProvider.updateUserConfiguration(this.config)
        .then(() => {
          loading1.dismiss();
        })
        .catch(() => {
          this.showToastMessage(errorMessage);
          loading1.dismiss();
        });
    });
  }

  showToastMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }

  ngOnDestroy(): void {
    console.log('Adios');
    this.userDataSubscription.unsubscribe();
  }
}
