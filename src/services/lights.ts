export class LightsService{

  ilumination: Array<any> = [
    {
      place: 'Cocina',
      lights: [{
        id: 1,
        name: "Principal",
        on: true
      },
        {
          id: 2,
          name: "Cocineta",
          on: true
        },
        {
          id: 3,
          name: "Lavatrastes",
          on: true
        }]
    },
    {
      place: 'Comedor',
      lights: [{
        id: 4,
        name: "Central",
        on: false
      },
        {
          id: 5,
          name: "Secundario",
          on: true
        }]
    },
    {
      place: 'Sala',
      lights: [{
        id: 6,
        name: "General",
        on: true
      },
        {
          id: 7,
          name: "Tenúe",
          on: false
        },
        {
          id: 8,
          name: "Lámpara",
          on: false
        }]
    }
  ];

  getItems(){
    return this.ilumination.slice();
  }

  changeStatus(id_place: number, id_light: number){
    var status = this.ilumination[id_place].lights[id_light].on;
    this.ilumination[id_place].lights[id_light].on = !(status);
  }
}
