import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ConfigurationPage} from "../pages/configuration/configuration";
import {IluminationPage} from "../pages/ilumination/ilumination";
import {LightsService} from "../services/lights";
import {GroceryShoppingPage} from "../pages/grocery-shopping/grocery-shopping";
import {GroceriesService} from "../services/groceries";
import {GroceryStorePage} from "../pages/grocery-store/grocery-store";
import {GroceryStoresService} from "../services/grocery-stores";
import {PopoverInfoComponent} from "../components/more-info.popover";
import {VigilancePage} from "../pages/vigilance/vigilance";
import {CamerasService} from "../services/cameras";
import {IluminationConfigPage} from "../pages/ilumination-config/ilumination-config";
import {CameraPage} from "../pages/camera/camera";
import {DataVerificationPage} from "../pages/data-verification/data-verification";
import {SuccessfulPaymentPage} from "../pages/successful-payment/successful-payment";

import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {ProductsService} from "../services/products";
import { ProductsApiProvider } from '../providers/products-api/products-api';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ConfigurationPage,
    IluminationPage,
    GroceryShoppingPage,
    GroceryStorePage,
    PopoverInfoComponent,
    IluminationConfigPage,
    VigilancePage,
    CameraPage,
    DataVerificationPage,
    SuccessfulPaymentPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atrás'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ConfigurationPage,
    IluminationPage,
    GroceryShoppingPage,
    GroceryStorePage,
    PopoverInfoComponent,
    IluminationConfigPage,
    VigilancePage,
    CameraPage,
    DataVerificationPage,
    SuccessfulPaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LightsService,
    GroceriesService,
    GroceryStoresService,
    CamerasService,
    ScreenOrientation,
    ProductsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsApiProvider
  ]
})
export class AppModule {}
