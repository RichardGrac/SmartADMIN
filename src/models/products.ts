export class Product{
  constructor(public id: number, public name: string, public quantity: number, public type: string){}

  setAll(name: string, quantity: number, type: string){
    this.name = name;
    this.quantity = quantity;
    this.type = type;
  }
}
