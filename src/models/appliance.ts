export class Appliance {
  constructor(public id: number,
              public name: string,
              public on: boolean,
              public initial_CtrlAuto: boolean,
              public initial_time: Date,
              public final_CtrlAuto: boolean,
              public final_time: Date){}
}
