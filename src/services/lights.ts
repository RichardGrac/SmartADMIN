import {Light, Light_Place} from "../models/light_place";

export class LightsService{

  Kitchen_Lights: Array<Light> = [
      new Light(0, 'Principal', true, false, '00:00', false, '23:59'),
      new Light(1, 'Cocineta', true, false, '00:00', false, '23:59'),
      new Light(2, 'Lavatrastes', true, false, '00:00', false, '23:59')
  ];

  Garden_Lights: Array<Light> = [
    new Light(0, "Central", false, false, '00:00', false, '23:59'),
    new Light(1, "Secundario", true, false, '00:00', false, '23:59')
  ];

  LivingR_Lights: Array<Light> = [
    new Light(0, "General", true, false, '00:00', false, '23:59'),
    new Light(1, "Tenúe", false, false, '00:00', false, '23:59'),
    new Light(2, "Lámpara", false, false, '00:00', false, '23:59')
  ];

  ilumination: Array<Light_Place> = [
    new Light_Place(0, 'Cocina', this.Kitchen_Lights),
    new Light_Place(1, 'Jardín', this.Garden_Lights),
    new Light_Place(2, 'Sala', this.LivingR_Lights)
  ];

  getItems(){
    return this.ilumination.slice();
  }

  changeStatus(id_place: number, id_light: number){
    var status = this.ilumination[id_place].lights[id_light].on;
    this.ilumination[id_place].lights[id_light].on = !(status);
  }

  getLightInfo(id_place: number){
    let object = this.ilumination[id_place];
    return object;
  }

  setStatusAutoOn(id_place: number, index_light: number, newStatus: boolean) {
    this.ilumination[id_place].lights[index_light].auto_on = newStatus;
  }

  setStatusAutoOff(id_place: number, index_light: number, newStatus: boolean) {
    this.ilumination[id_place].lights[index_light].auto_off = newStatus;
  }

  setName(id_place: number, index_light: number, name: string){
    this.ilumination[id_place].lights[index_light].name = name;
  }

  changeTimeStarts(id_place: number, index_light: number, timeStarts: string) {
    this.ilumination[id_place].lights[index_light].timeStarts = timeStarts;
  }

  changeTimeEnds(id_place: number, index_light: number, timeEnds: string) {
    this.ilumination[id_place].lights[index_light].timeEnds = timeEnds;
  }
}
