import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CamerasService} from "../../services/cameras";
import {Camera} from "../../models/camera_place";

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage implements OnInit{

  place_name: string;
  camera: Camera;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cameraService: CamerasService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.place_name = this.navParams.get('place');
    this.getCameraObject();
  }

  editCameraName(){
    let prompt = this.alertCtrl.create({
      title: 'Editar nombre',
      message: "Introduzca el nuevo nombre",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            return;
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              this.showToastMessage('Por favor ingrese un valor valido');
            }else{
              this.cameraService.setName(this.navParams.get('id_place'), this.camera.id_camera, data.name);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  private getCameraObject() {
    this.camera = this.cameraService.getCamera(this.navParams.get('id_place'), this.navParams.get('id_camera'));
  }

  showToastMessage(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }
}
