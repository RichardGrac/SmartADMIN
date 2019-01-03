import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigningUpPage } from './signing-up';

@NgModule({
  declarations: [
    SigningUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SigningUpPage),
  ],
})
export class SigningUpPageModule {}
