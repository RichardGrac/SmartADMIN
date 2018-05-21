import {Payment} from "../models/Payment";

export class ServicePaymentsService {

  services: Array<Payment> = [];

  addService(operation_name: string, amount: number, card_number: string, company: string){
    this.services = []; // Because this Class will hold this information just statically: of the last operation done.
    this.services.push(new Payment(operation_name, amount, card_number, company, new Date()));
    this.printServices();
  }

  addServiceByObject(payment: Payment){
    this.services = [];
    this.services.push(payment);
    this.printServices();
  }

  getLastService(){
    var aux = this.services[this.services.length-1];
    /* We've to return the Time of the Payment Conclusion, so We modify that */
    // aux.date = new Date().toLocaleString();
    aux.date = new Date();
    return aux;
  }

  printServices(){
    for (let i = 0; i < this.services.length; i++) {
      console.log("Operación: " + this.services[i].operation_name + " - Monto: $" + this.services[i].amount);
    }
  }
}
