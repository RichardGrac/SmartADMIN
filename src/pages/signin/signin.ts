import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {GoogleTranslateProvider} from "../../providers/google-translate/google-translate";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit{

  email: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              private authService: FirebaseAuthProvider,
              private alertCtrl: AlertController,
              private userDataProvider: UserDataProvider,
              private translator: GoogleTranslateProvider,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const newEmail = this.navParams.get('email');
    const newPassword = this.navParams.get('password');
    this.email = (newEmail) ? newEmail : '';
    this.password = (newPassword) ? newPassword : '';

    this.loginForm = this.fb.group({
        email: [this.email, [Validators.compose([Validators.required, Validators.email])]],
        password: [this.password, Validators.required]
      });
  }

  onLogin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesión'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
      .then((data) => {
        this.userDataProvider.registerLastLogin(data.user.uid);
        loading.dismiss();
        this.menuCtrl.close();
      })
      .catch(error =>{
        this.translator.translateFunction(error.message)
          .subscribe(response => {
            loading.dismiss();
            // @ts-ignore
            const translate = response.text;
            const alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: 'Inicio fallido',
              message: translate,
              buttons: ['Aceptar'],
              cssClass: 'black-title'
            });
            alert.present();
          });
      });
  }
}
