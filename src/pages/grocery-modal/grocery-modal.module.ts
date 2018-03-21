import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryModalPage } from './grocery-modal';

@NgModule({
  declarations: [
    GroceryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GroceryModalPage),
  ],
})
export class GroceryModalPageModule {}
