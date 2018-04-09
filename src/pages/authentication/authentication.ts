import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  try_number: number = 0;
  error_code: boolean = false;
  code: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  closeModal() {
    this.viewCtrl.dismiss({code: this.code});
  }

  verifyAuth(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Verificando código...',
      duration: 250
    });

    loading.onDidDismiss(() => {

      if (form.value.code == '1234') {
        this.code = true;
        this.closeModal();

      } else {
        console.log('Código erroneo');
        form.reset();
        this.try_number += 1;
        this.error_code = true;
      }
    });

    loading.present();

  }
}
