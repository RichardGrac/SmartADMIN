export interface Place {
  id_place: number,
  place: string,
  lights: Light[]
}

export interface Light {
  on: boolean,
  name: string,
  auto_off: boolean,
  timeEnds: string,
  auto_on: boolean,
  id_light: number,
  timeStarts: string
}
