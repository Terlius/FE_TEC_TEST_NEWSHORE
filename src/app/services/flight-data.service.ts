import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Flight } from '../models/flight.model';
import { Transport } from '../models/transport.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  private api_url = environment.API_URL;
  //Optimizar la consulta 
  private flightsCache: Flight[] = [];

  constructor(private http: HttpClient) { }
  getFlights(): Observable<Flight[]> {
    if (this.flightsCache.length > 0) {
      
      console.log('Returning flights from cache')
      return of(this.flightsCache);
    } else {
      
      // Si los datos de vuelo no están en caché, realiza una solicitud HTTP y guárdalos en caché
      return this.http.get(this.api_url).pipe(
        map((data: any) => {
          const flights = data.map((flightData: any) => this.mapFlightData(flightData));
          this.flightsCache = flights;
          return flights;
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error fetching flight data:', error);
          return of([]); // Devuelve una lista vacía en caso de error
        })
      );
    }
  }

  private mapFlightData(flightData: any): Flight {
    const flight = new Flight();
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
