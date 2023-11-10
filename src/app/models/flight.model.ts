
import { CurrencyConverterService } from '../services/currency-converter.service';
import { Transport } from './transport.model';

export class Flight {
   
    transport?: Transport;
    price: number = 0;
    origin: string = 'N/A';
    destination: string = 'N/A';
    currency: string = 'USD';
    priceCurrency: number = this.price;
    currencyTemp: string = this.currency;

    constructor(
        private _currencyConverterService: CurrencyConverterService
    ) {
    }

    /**
     * Sets the currency of the flight to USD, COP, or EUR and updates the priceCurrency 
     * @param currency USD, COP, or EUR
     * @returns void
     */
    setCurrency(currency: string) {
        this.priceCurrency = this._currencyConverterService.currencyConverter(this.price, this.currency, currency);
        this.currencyTemp = currency;
        
    }
}