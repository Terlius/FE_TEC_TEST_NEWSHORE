import { Flight } from './flight.model';

export class Journey {
  public flights: Flight[] = [];
  public origin: string = '';
  public destination: string = '';
  public price: number = 0;
  public currency: string = 'USD';

  constructor() {
  }

  public updatePrice(): void {
    let price = 0;
    for (const flight of this.flights!) {
      price += flight.price!;
    }
    this.price = price;
  }

  setCurrency(tipo: number) {
    if (tipo == 1) {
      for (const flight of this.flights!) {
        flight.setCurrencyUSD();
        this.currency = 'USD';
      }
    } else if (tipo == 2) {
      for (const flight of this.flights!) {
        flight.setCurrencyCOP();
        this.currency = 'COP';
      }
    } else {
      for (const flight of this.flights!) {
        flight.setCurrencyEUR();
        this.currency = 'EUR';
      }

    }

    this.updatePrice();
  }


}

