import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryShoppingPage } from './grocery-shopping';

@NgModule({
  declarations: [
    GroceryShoppingPage,
  ],
  imports: [
    IonicPageModule.forChild(GroceryShoppingPage),
  ],
})
export class GroceryShoppingPageModule {}
