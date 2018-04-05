import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VigilancePage } from './vigilance';

@NgModule({
  declarations: [
    VigilancePage,
  ],
  imports: [
    IonicPageModule.forChild(VigilancePage),
  ],
})
export class VigilancePageModule {}
