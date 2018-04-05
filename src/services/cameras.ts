import {Camera, Camera_Place} from "../models/camera_place";

export class CamerasService{

  out_cameras: Array<Camera> = [
    new Camera(0, 'Camara 1', true),
    new Camera(1, 'Camara 2', true),
    new Camera(2, 'Camara 3', false),
    new Camera(3, 'Camara 4', true)
  ];

  garden_cameras: Array<Camera> = [
    new Camera(0, 'Camara 5', false),
    new Camera(1, 'Camara 6', true),
  ];

  garage_cameras: Array<Camera> = [
    new Camera(0, 'Camara 7', true),
  ];

  vigilance: Array<Camera_Place> = [
    new Camera_Place(0, 'Exterior', this.out_cameras),
    new Camera_Place(1, 'Garden', this.garden_cameras),
    new Camera_Place(2, 'Garage', this.garage_cameras),
  ];

  getVigilanceItems(){
    return this.vigilance.slice();
  }
}
