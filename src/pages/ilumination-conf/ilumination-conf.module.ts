import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IluminationConfPage } from './ilumination-conf';

@NgModule({
  declarations: [
    IluminationConfPage,
  ],
  imports: [
    IonicPageModule.forChild(IluminationConfPage),
  ],
})
export class IluminationConfPageModule {}
