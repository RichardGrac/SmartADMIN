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
import {StoresService} from "../services/stores";
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
import {ServicePaymentsService} from "../services/servicePayments";
import {ServicesPage} from "../pages/services/services";
import { ServicesApiProvider } from '../providers/services-api/services-api';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "angularfire2/auth";

import { StreamingMedia } from "@ionic-native/streaming-media";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {TemperaturePage, FormatTimePipe} from "../pages/temperature/temperature";
import {TemperaturesService} from "../services/temperatures";
import {IrrigationPage} from "../pages/irrigation/irrigation";
import { WeatherProvider } from '../providers/weather/weather';
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";

import { FirebaseAuthProvider } from '../providers/firebase-auth/firebase-auth';
import { UserDataProvider } from '../providers/user-data/user-data';
import { LightsDataProvider } from '../providers/lights-data/lights-data';
import {TermsAndConditionsPage} from "../pages/terms-and-conditions/terms-and-conditions";
import {AboutUsPage} from "../pages/about-us/about-us";
import { GoogleTranslateProvider } from '../providers/google-translate/google-translate';
import { SigningUpPage } from '../pages/signing-up/signing-up';
import { IrrigationDataProvider } from '../providers/irrigation-data/irrigation-data';

import { AddDevicePage } from '../pages/add-device/add-device';
import { Hotspot } from '@ionic-native/hotspot'
import {PaymentPlansPage} from '../pages/payment-plans/payment-plans';

export const config = {
  apiKey: "AIzaSyBe3wyrUzTphqwc4FfpaVmXeoPHVV4U8Vw",
  authDomain: "smart-admin-8de18.firebaseapp.com",
  databaseURL: "https://smart-admin-8de18.firebaseio.com",
  projectId: "smart-admin-8de18",
  storageBucket: "smart-admin-8de18.appspot.com",
  messagingSenderId: "645481167613"
};

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
    SuccessfulPaymentPage,
    ServicesPage,
    TemperaturePage,
    IrrigationPage,
    FormatTimePipe,
    SigninPage,
    SignupPage,
    SigningUpPage,
    TermsAndConditionsPage,
    AboutUsPage,
    AddDevicePage,
    PaymentPlansPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atrás'
    }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
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
    SuccessfulPaymentPage,
    ServicesPage,
    TemperaturePage,
    IrrigationPage,
    SigninPage,
    SignupPage,
    SigningUpPage,
    TermsAndConditionsPage,
    AboutUsPage,
    AddDevicePage,
    PaymentPlansPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LightsService,
    GroceriesService,
    StoresService,
    CamerasService,
    ScreenOrientation,
    ProductsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsApiProvider,
    ServicePaymentsService,
    ServicesApiProvider,
    StreamingMedia,
    BarcodeScanner,
    TemperaturesService,
    WeatherProvider,
    FirebaseAuthProvider,
    UserDataProvider,
    LightsDataProvider,
    GoogleTranslateProvider,
    IrrigationDataProvider,
    Hotspot
  ]
})
export class AppModule {}
