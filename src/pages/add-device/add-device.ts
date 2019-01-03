import {Component, ViewChild} from '@angular/core'
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Platform,
  Slides, ToastController
} from 'ionic-angular'
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner"
import { Keyboard } from 'ionic-angular'
import { Hotspot } from '@ionic-native/hotspot'
import { LightsDataProvider } from '../../providers/lights-data/lights-data'


declare var esptouch

@IonicPage()
@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})
export class AddDevicePage {

  @ViewChild(Slides) slides: Slides
  private idDevice: any
  private networkConfig: object
  private name: string
  private password: string
  private connectionInfo: object
  private  error: any
  private disabled: boolean
  private loading: any
  private idPlace: any
  private page: any

  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    private keyboard: Keyboard,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private hotspot: Hotspot,
    public lightsData: LightsDataProvider,
    private navParams: NavParams,)
  {
    const { idPlace, page } = this.navParams.data
    this.idPlace = idPlace
    this.page = page
    this.networkConfig = { ssid: '', password: '' }
    this.connectionInfo = {
      ssid: ''
    }
    this.name = ''
    this.password = ''
    this.disabled = true
    this.getConnectionInfo()
    this.loading = this.loadingCtrl.create({
      content: 'Configurando dispositivo...',
      enableBackdropDismiss: false,
      spinner: 'dots'
    })
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true)
  }

  nextSlide() {
    this.slides.lockSwipes(false)
    this.slides.slideNext()
    this.slides.lockSwipes(true)
  }

  prevSlide() {
    this.slides.lockSwipes(false)
    this.slides.slidePrev()
    this.slides.lockSwipes(true)
  }

  openScanner() {
    console.log('[INFO] - Start scan')
    this.platform.ready().then(() => {
      const options: BarcodeScannerOptions = {
        prompt: 'Escanea el codigo QR',
        showTorchButton: true,
      }
      this.barcodeScanner.scan(options).then(({ text, cancelled }) => {
        if (cancelled == false) {
          this.idDevice = text
          this.nextSlide()
        }
      }).catch(err => {
        console.log('Error', err)
      })
    })
  }

  onAddNewLight () {
    const prompt = this.alertCtrl.create({
      title: 'Nombre del item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Iluminación Principal, Lateral, Switch 1, etc.'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: ({ name }) => {
            if (name.trim() != '' || name != null){
              this.name = name
              this.nextSlide()
            } else {
              this.presentErrorToast()
            }
          }
        }
      ]
    })
    prompt.present()
  }

  onAddPassword () {
    const prompt = this.alertCtrl.create({
      title: 'Contraseña',
      inputs: [{name: 'password'}],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: ({ password }) => {
            if (password.trim() != '' || password != null){
              this.password = password
              this.nextSlide()
            } else {
              this.presentErrorToast()
            }
          }
        }
      ]
    })
    prompt.present()
  }

  presentErrorToast(message: string = 'El campo no debe ser vacío') {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000
    })
    toast.present()
  }

  getConnectionInfo() {
    this.hotspot.getConnectionInfo()
      .then(({ SSID: _ssid, BSSID: bssid }) => {
        const ssid = _ssid.replace(/["]+/g, '')
        this.connectionInfo =  { ssid, bssid }
      })
      .catch((e) => {
        this.error = e
      })
  }

  initSmartConfig() {
    console.log('[INFO] init config')
    this.loading.present()
    this.saveDevice()
      .then(() => {
        esptouch.start(this.connectionInfo['ssid'], this.connectionInfo['bssid'], this.password, "NO", 1,
          res => { this.configComplete(res) },
          err => { this.configError(err) }
        )
      })
      .catch(() => {
        this.presentErrorToast()
      })
  }

  configComplete(res) {
    console.log('[INFO] config complete')
    this.loading.dismiss()
    this.nextSlide()
  }

  configError(err) {
    this.loading.dismiss()
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'No se ha podido configurar tu dispositivo',
      message: 'Comprueba que tu dispositivo está conectado a la red eléctrica',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
  }

  saveDevice() {
    return new Promise(((resolve, reject) => {
      // const { idPlace } = this.navParams.data
      this.lightsData.addNewLightInRTDB(this.idDevice, this.idPlace)
        .then(() => {
          this.lightsData.addNewLight(this.idPlace, this.name, this.idDevice)
            .then(() => {
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
        })
        .catch((e) => {
          reject(e)
        })
    }))
  }

  finalize() {
    this.navCtrl.pop()
  }
}
