import { Flight } from './flight.model';

export class Journey {
  public flights: Flight[] = [];
  public origin: string = 'N/A';
  public destination: string = 'N/A';
  public price: number = 0;
  public currency: string = 'USD';

  constructor() {
  }

  /**
   * Updates the price of the journey based on the price of the flights
   * 
   * @returns void
   */

  public updatePrice(): void {
    let price = 0;
    for (const flight of this.flights!) {
      price += flight.price!;
    }
    this.price = price;
  }

  /**
   * Sets the currency of the journey to USD, COP, or EUR
   * @param tipo 1 for USD, 2 for COP, 3 for EUR
   * @returns void
   */
  setCurrency(tipo: number) {
   
    for (const flight of this.flights!) {
      if (tipo === 1) {
        flight.setCurrency('USD');
        this.currency = 'USD';
      } else if (tipo === 2) {
        flight.setCurrency('COP');
        this.currency = 'COP';
      } else if (tipo === 3) {
        flight.setCurrency('EUR');
        this.currency = 'EUR';
      }
    }

    this.updatePrice();
  }
}
