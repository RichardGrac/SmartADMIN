import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IluminationConfigPage } from './ilumination-config';

@NgModule({
  declarations: [
    IluminationConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(IluminationConfigPage),
  ],
})
export class IluminationConfigPageModule {}
