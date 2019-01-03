import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage implements OnInit{

  try_number: number = 0;
  error_code: boolean = false;
  code: string = "";

  /* When the page will be dismissed, if true: the user will can continue. */
  successful_code: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.viewCtrl.dismiss({successful_code: this.successful_code});
  }

  verifyAuth(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Verificando código...',
      duration: 250
    });

    loading.onDidDismiss(() => {

      if (form.value.code == '1234') {
        this.error_code = false;
        this.successful_code = true;
        this.closeModal();

      } else {
        console.log('Código erroneo. Codigo: ' + this.code);
        this.code = '';
        form.reset();
        this.try_number += 1;
        this.error_code = true;
      }
    });

    loading.present();

  }

  /*
  * This function will append the numbers clicked from the 'Screen Keyboard' to the -Input:text-
  * */
  appendNumber(number: string){
    if (number == 'backspace'){
      if (this.code.length > 0){
        this.code = this.code.substring(0, this.code.length-1);
      }
    }else if (this.code.length < 4){
      this.code += number;
    }
  }
}
