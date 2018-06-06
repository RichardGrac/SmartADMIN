import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IrrigationPage } from './irrigation';

@NgModule({
  declarations: [
    IrrigationPage,
  ],
  imports: [
    IonicPageModule.forChild(IrrigationPage),
  ],
})
export class IrrigationPageModule {}
