export class Camera{
  constructor(public id_camera: number, public name: string, public on: boolean){}
}

export class Camera_Place{
  constructor(public id_place, public place: string, public cameras: Camera[]){}
}
