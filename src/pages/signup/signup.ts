import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController,
  ModalController,
  NavController
} from 'ionic-angular';
import {SigninPage} from "../signin/signin";

import {AbstractControl, NgForm} from "@angular/forms";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {TermsAndConditionsPage} from "../terms-and-conditions/terms-and-conditions";
import {SigningUpPage} from "../signing-up/signing-up";
import {GoogleTranslateProvider} from "../../providers/google-translate/google-translate";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  loginForm: FormGroup;
  termsAndConditionsPage:any = TermsAndConditionsPage;
  signingUpPage:any = SigningUpPage;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              private authService: FirebaseAuthProvider,
              private userData: UserDataProvider,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private translator: GoogleTranslateProvider,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        name: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, [Validators.compose([Validators.required, Validators.email])]],
        password: [null, [Validators.compose([Validators.required, Validators.minLength(6)])]],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  onSignup(form: NgForm) {
    let modal = this.modalCtrl.create(this.signingUpPage);
    modal.present();

    const loading = this.loadingCtrl.create({
      content: 'Realizando registro...'
    });
    loading.present();

    this.authService.signup(form.value.email, form.value.password)
      .then(data => {

        this.userData.createInitialProfile(form.value.name, form.value.lastname, form.value.email, data.user.uid)
          .then(data => {
            loading.dismiss();


            const alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: 'Registro exitoso',
              message: '¡Bienvenido ' + form.value.name.toUpperCase() +
                '! por favor, verifica tú correo antes de entrar.',
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    this.authService.logout();
                    modal.dismiss();
                    this.navCtrl.setRoot(SigninPage, {
                      "email": form.value.email,
                      "password": form.value.password
                    });
                    this.menuCtrl.close();
                  }
                }
              ],
              cssClass: 'black-title'
            });
            alert.present();
          })

      })
      .catch(error => {
        loading.dismiss();
        modal.dismiss();
        this.translator.translateFunction(error.message)
          .subscribe(response => {
            loading.dismiss();
            // @ts-ignore
            const translate = response.text;
            const alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: 'Registro fallido',
              message: translate,
              buttons: ['Aceptar'],
              cssClass: 'black-title'
            });
            alert.present();
          });
      });
  }

  onLoadTaC() {
    let modal = this.modalCtrl.create(this.termsAndConditionsPage);
    modal.present();
  }
}

class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
      return null
    }
  }
}
