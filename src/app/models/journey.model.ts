import { Flight } from './flight.model';

export class Journey {
  public flights?: Flight[];
  public origin?: string;
  public destination?: string;
  public price?: number;

  constructor() {
  
  }

  public updatePrice(): void {
    let price = 0;
    for (const flight of this.flights!) {
      price += flight.price!;
    }
    this.price = price;
  }

}

  