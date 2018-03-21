import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryStorePage } from './grocery-store';

@NgModule({
  declarations: [
    GroceryStorePage,
  ],
  imports: [
    IonicPageModule.forChild(GroceryStorePage),
  ],
})
export class GroceryStorePageModule {}
