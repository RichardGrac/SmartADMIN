import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataVerificationPage } from './data-verification';

@NgModule({
  declarations: [
    DataVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(DataVerificationPage),
  ],
})
export class DataVerificationPageModule {}
