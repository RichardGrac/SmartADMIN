export class Light {
  constructor(
    public id_light: number,
    public name: string,
    public on: boolean,
    public auto_on: boolean,
    public timeStarts: string,
    public auto_off: boolean,
    public timeEnds: string
  ){}
}

export class Light_Place {
  constructor(public id_place: number, public place: string, public lights: Light[]){}
}
