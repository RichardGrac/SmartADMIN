export class Payment{
  constructor(public operation_name: string,
              public amount: number,
              public card_number: string,
              public company: string,
              public date: Date){}
}
