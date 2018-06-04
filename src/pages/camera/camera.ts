import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {CamerasService} from "../../services/cameras";
import {Camera} from "../../models/camera_place";
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage implements OnInit {

  place_name: string;
  camera: Camera;
  url: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cameraService: CamerasService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              private streamingMedia: StreamingMedia,
              private platform: Platform
              ) {
  }

  ngOnInit(): void {
    this.place_name = this.navParams.get('place');
    this.getCameraObject();
    this.url = this.cameraService.getUrl();
  }

  editCameraName() {
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
            if (data.name.trim() == '' || data.name == null) {
              this.showToastMessage('Por favor ingrese un valor valido');
            } else {
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

  showToastMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'font-black',
    }).present();
  }

  onConectToVideo(){
    let prompt = this.alertCtrl.create({
      title: 'URL Streaming',
      message: 'Introduzca la URL para reproducir el streaming',
      inputs: [
        {
          name: 'URL',
          placeholder: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov',
          value: this.url
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Conectar',
          handler: (data) => {
            this.url = data.URL;
            this.cameraService.setUrl(data.URL);
            console.log('Conectando a: ', this.url);
            this.onPlayingVideo();
          }
        }
      ]
    });
    prompt.present();
  }

  onPlayingVideo(){
    console.log("OnPlayingVideo()");

    this.platform.ready().then(() => {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => {this.showToastMessage('Error al inicializar...') },
      orientation: 'landscape'
    };
    this.streamingMedia.playVideo(this.url, options);
    });
  }

}
