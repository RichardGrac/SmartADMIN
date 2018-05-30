import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemperaturePage } from './temperature';

@NgModule({
  declarations: [
    TemperaturePage,
  ],
  imports: [
    IonicPageModule.forChild(TemperaturePage),
  ],
})
export class TemperaturePageModule {}
