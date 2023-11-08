import { Transport } from './transport.model';

export class Flight {
    transport?: Transport;
    price?: number;
    origin?: string;
    destination?: string;

    constructor(transport?: Transport, price?: number, origin?: string, destination?: string) {
        this.transport = transport;
        this.price = price;
        this.origin = origin;
        this.destination = destination;
    }

    
  }