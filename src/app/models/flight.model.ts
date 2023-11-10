
import { CurrencyConverterService } from '../services/currency-converter.service';
import { Transport } from './transport.model';

export class Flight {
    private readonly COP_TO_USD = 3800;
    private readonly EUR_TO_USD = 0.93;
    private readonly COP_TO_EUR = 4380;

    transport?: Transport;
    price: number = 0;
    origin: string = 'N/A';
    destination: string = 'N/A';
    currency: string = 'USD';

    constructor(
        private _currencyConverterService: CurrencyConverterService
    ) {
    }

    /**
     * Sets the currency of the flight to USD
     * 
     * @returns void
     */
    setCurrency(currency: string) {
        this.price = this._currencyConverterService.currencyConverter(this.price!, this.currency!, currency);
        this.currency = currency;
        
    }
}