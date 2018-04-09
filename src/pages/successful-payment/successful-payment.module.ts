import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessfulPaymentPage } from './successful-payment';

@NgModule({
  declarations: [
    SuccessfulPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessfulPaymentPage),
  ],
})
export class SuccessfulPaymentPageModule {}
