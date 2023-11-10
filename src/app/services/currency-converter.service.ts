import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private readonly exchangeRates = {
    COP_TO_USD: 3800,
    EUR_TO_USD: 0.93,
    COP_TO_EUR: 4380
  };

  constructor() { }

  /**
   * function to convert price from one currency to another
   * @param price, price to convert
   * @param currency, currency of the price
   * @param newCurrency, new currency to convert
   * @returns number, converted price
   */
  currencyConverter(price: number, currency: string, newCurrency: string): number {

    if (currency === newCurrency) {
      return price;
    }

    if (currency === 'USD') {
      if (newCurrency === 'COP') {
        return price * this.exchangeRates.COP_TO_USD;
      } else {
        return price * this.exchangeRates.EUR_TO_USD;
      }
    }

    if (currency === 'COP') {
      if (newCurrency === 'USD') {
        return price / this.exchangeRates.COP_TO_USD;
      } else {
        return price / this.exchangeRates.COP_TO_EUR;
      }
    }

    if (currency === 'EUR') {
      if (newCurrency === 'USD') {
        return price / this.exchangeRates.EUR_TO_USD;
      } else {
        return price * this.exchangeRates.COP_TO_EUR;
      }
    }

    return price;
  }

}
