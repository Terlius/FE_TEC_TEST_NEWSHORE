import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Flight } from '../models/flight.model';
import { Transport } from '../models/transport.model';
import { environment } from 'src/environments/environment';
import { CurrencyConverterService } from './currency-converter.service';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  private api_url = environment.API_URL;
  private flightsCache: Flight[] = [];

  constructor(
    private http: HttpClient,
    private _currencyConverterService: CurrencyConverterService) { }

  /**
   * Get the flights from the API or from the cache
   * @returns Observable<Flight[]>
   */
  getFlights(): Observable<Flight[]> {

    if (this.flightsCache.length > 0) {

      console.log('Returning flights from cache')
      return of(this.flightsCache);
    } else {

      return this.http.get(this.api_url).pipe(
        map((data: any) => {
          const flights = data.map((flightData: any) => this.mapFlightData(flightData));
          this.flightsCache = flights;
          return flights;
        }),
        catchError(error => {
          
          console.error('Error fetching flight data:', error);
          return of([]); 
        })
      );
    }
  }

  /**
   * Map flight data from API to Flight model
   * @param flightData 
   * @returns Flight
   */
  private mapFlightData(flightData: any): Flight {
    const flight = new Flight(this._currencyConverterService);
    flight.price = flightData.price;
    flight.origin = flightData.departureStation;
    flight.destination = flightData.arrivalStation;

    const transport = new Transport();
    transport.flightCarrier = flightData.flightCarrier;
    transport.flightNumber = flightData.flightNumber;

    flight.transport = transport;

    return flight;
  }
}
