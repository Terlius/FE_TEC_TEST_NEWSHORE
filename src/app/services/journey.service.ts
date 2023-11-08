import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journey } from '../models/journey.model';
import { FlightDataService } from './flight-data.service';
import { Flight } from '../models/flight.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private flights: Flight[] = [];

  constructor(private _flight_data_service: FlightDataService) {
  }

  initialize(): Observable<Flight[]> {
    return this._flight_data_service.getFlights();
  }

  findRoutesWithStops(origin: string, destination: string, maxStops: number): Observable<Journey[]> {
    return this.initialize().pipe(
      map((flights: Flight[]) => {
        this.flights = flights;
        const routes: Journey[] = [];
        const initialFlights: Flight[] = [];
        this.findRoutesRecursive(origin, destination, maxStops, initialFlights, routes);
        return this.updateJourney(routes, origin, destination);

      })
    );
  }

  private findRoutesRecursive(
    currentLocation: string,
    destination: string,
    maxStops: number,
    currentRoute: Flight[],
    routes: Journey[]
  ) {
    if (maxStops < 0) {
      return;
    }

    if (currentLocation === destination) {
      let newJourney = new Journey();
      newJourney.flights = [...currentRoute];

      routes.push(newJourney);


      return;
    }

    for (const flight of this.flights) {
      if (flight.origin === currentLocation) {
        currentRoute.push(flight);
        this.findRoutesRecursive(flight.destination!, destination, maxStops - 1, currentRoute, routes);
        currentRoute.pop();
      }

    }
  }

  updateJourney(journey: Journey[], origin: string, destination: string): Journey[] {

    for (const j of journey) {
      j.origin = origin;
      j.destination = destination;
      j.updatePrice();
    }


    return journey;
  }

}
