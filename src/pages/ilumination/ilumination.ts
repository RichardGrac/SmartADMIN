import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  ModalController,
  LoadingController, AlertController, ToastController
} from 'ionic-angular';
import {PopoverInfoComponent} from "../../components/more-info.popover";
import {IluminationConfigPage} from "../ilumination-config/ilumination-config";
import {LightsDataProvider} from "../../providers/lights-data/lights-data";
import {UserDataProvider} from "../../providers/user-data/user-data";
import { ActionSheetController } from 'ionic-angular';
import {Subscription} from "rxjs";
import { AddDevicePage } from '../add-device/add-device'


@IonicPage()
@Component({
  selector: 'page-ilumination',
  templateUrl: 'ilumination.html',
})

export class IluminationPage implements OnInit, OnDestroy{
  ilumination: any[];
  public places: any;
  public placesSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController,
              private userData: UserDataProvider,
              public lightsData: LightsDataProvider,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController) {

  }

  ngOnInit () {
    let loading1 = this.loadingCtrl.create({
      content: 'Obteniendo información',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      try {
        this.lightsData.setUserId(this.userData.currentUserUid);
        this.placesSubscription = this.lightsData.getPlaceList()
          .valueChanges()
          .subscribe(places => {

          places.forEach((place) => {
            let lightSubscription = this.lightsData.getLightList(place.idPlace)
              .valueChanges()
              .subscribe(lights => {
                place.lights = lights;
              });
            this.placesSubscription.add(lightSubscription);
          });

            this.places = places;
            loading1.dismiss();
          });
      }catch (e) {
        this.presentErrorToast('An error ocurred when getting Illumination data')
      }
    });
  }

  onAddNewItem() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar nuevo(a)',
      buttons: [
        {
          text: 'Contenedor',
          role: 'newPlace',
          handler: () => {
            this.onCreatingNewPlaceName()
          }
        },{
          text: 'Item',
          handler: () => {
            if (!this.places || this.places.length === 0){
              this.presentErrorToast('Agrega un Contenedor primero')
            } else {
              this.onSelectingThePlaceForLight()
            }
          }
        },{
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  onCreatingNewPlaceName() {
    const prompt = this.alertCtrl.create({
      title: 'Nombre del contenedor',
      message: "Éste contendrá todos tus elementos de iluminación organizados.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Cocina, Jardín, Garage, etc.',
          min: 1
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: data => {
            if (data.name.trim() != '' || data.name != null){
              this.onAddNewPlace(data.name);
            } else {
              this.presentErrorToast();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  presentErrorToast(message: string = 'El campo no debe ser vacío') {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  onAddNewPlace (placeName) {
    this.lightsData.addNewPlace(placeName)
      .then()
      .catch(error => {
        this.presentErrorToast('An error ocurred when Adding a new Place');
      })
  }

  onSelectingThePlaceForLight() {
    let buttons: any[];
    buttons = this.places.map(place => {
      return {
        text: place.placeName,
        role: place.idPlace,
        handler: () => {this.onAddNewLight(place.idPlace)}}
    });
    buttons.push({text: 'Cancelar', role: 'cancel'});

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selección de Contenedor',
      buttons
    });
    actionSheet.present();
  }

  onAddNewLight (idPlace: string) {
    this.navCtrl.push(AddDevicePage, { idPlace, page: 'illumination' })
    // const prompt = this.alertCtrl.create({
    //   title: 'Nombre del item',
    //   inputs: [
    //     {
    //       name: 'name',
    //       placeholder: 'Iluminación Principal, Lateral, Switch 1, etc.'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'cancel'
    //     },
    //     {
    //       text: 'Crear',
    //       handler: data => {
    //         if (data.name.trim() != '' || data.name != null){
    //           const lightId = this.lightsData.createLightId();
    //           this.lightsData.addNewLightInRTDB(lightId)
    //             .then(() => {
    //               this.lightsData.addNewLight(idPlace, data.name, lightId);
    //             });
    //         } else {
    //           this.presentErrorToast();
    //         }
    //       }
    //     }
    //   ]
    // });
    // prompt.present();

  }

  onSelectToRemoveAContainer () {
    let buttons: any[];
    buttons = this.places.map(place => {
      return {
        text: place.placeName,
        handler: () => {

          const confirm = this.alertCtrl.create({
            title: '¿Seguro que quieres eliminarlo?',
            message: 'Todas los items relacionados serán eliminados también.',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel'
              },
              {
                text: 'Eliminar',
                handler: () => {
                  this.onRemoveAContainer(place.idPlace)
                }
              }
            ]
          });
          confirm.present();

        }}
    });
    buttons.push({text: 'Cancelar', role: 'cancel'});

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Eliminar contenedor',
      buttons
    });
    actionSheet.present();
  }

  onRemoveAContainer (idPlace: string) {
    this.presentErrorToast('Funcion no disponible todavía :P')
  }

  onChangeStatus(placeId: string, itemId: string, newStatus: boolean) {
    let loading1 = this.loadingCtrl.create({
      content: 'Cambiando de estado...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    });

    loading1.present().then(() => {
      this.lightsData.updateStatusOnFirebaseRTDB(itemId, newStatus)
        .then(() => {
          // Do the same change but in Firestore
          this.lightsData.updateLightValue(placeId, itemId, { on: newStatus })
            .then(() => loading1.dismiss())
            .catch(() => {
              loading1.dismiss();
              this.presentErrorToast('Hubo un error al cambiar el estado');
            })
        })
    });
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverInfoComponent);
    popover.present({
      ev: ev
    });
  }

  presentModal(idPlace: string, placeName: string, light: any) {
    let modal = this.modalCtrl.create(IluminationConfigPage, {idPlace: idPlace, placeName: placeName, light: light});
    modal.present();
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }
}
