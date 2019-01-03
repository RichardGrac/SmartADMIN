import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPlansPage } from './payment-plans';

@NgModule({
  declarations: [
    PaymentPlansPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPlansPage),
  ],
})
export class PaymentPlansPageModule {}
