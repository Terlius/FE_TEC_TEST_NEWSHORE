
import { Transport } from './transport.model';

export class Flight {
    transport?: Transport;
    price?: number;
    origin?: string;
    destination?: string;
    currency?: string = 'USD';

    constructor(transport?: Transport, price?: number, origin?: string, destination?: string) {
        this.transport = transport;
        this.price = price;
        this.origin = origin;
        this.destination = destination;
       
    }

    setCurrencyUSD() {
        if (this.currency === 'USD') {
            return;
        } else if (this.currency === 'COP') {
            this.price = this.price! / 3800;
            
        } else {
            this.price = this.price! * 0.93; // Usar punto en lugar de coma
        }
        this.currency = 'USD';
    }
    
    setCurrencyCOP() { // Cambié el nombre del método a setCurrenctCOP a setCurrenctCOP
        if (this.currency === 'COP') {
            return;
        } else if (this.currency === 'USD') {
            this.price = this.price! * 3800;
        } else {
            this.price = this.price! * 4.380; // Usar punto en lugar de coma
        }
        this.currency = 'COP';
    }
    
    setCurrencyEUR() {
      
        
        if (this.currency === 'EUR') {
            return;
        } else if (this.currency === 'COP') {
            this.price = this.price! / 4380;
        } else {
            this.price = this.price! / 0.93; // Usar punto en lugar de coma
        }
        this.currency = 'EUR';
    }
  }