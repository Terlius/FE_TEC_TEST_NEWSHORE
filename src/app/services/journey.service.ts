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


  constructor(private _flight_data_service: FlightDataService) {
  }

  /**
   * Get the flights from the API or from the cache
   * @returns Observable<Flight[]>
   */
  initialize(): Observable<Flight[]> {
    return this._flight_data_service.getFlights();
  }

  /**
   * find routes with stops between origin and destination and max stops allowed 
   * @param origin city code
   * @param destination city code
   * @param maxStops max stops allowed
   * @returns Observable<Journey[]>
   */
  findRoutesWithStops(origin: string, destination: string, maxStops: number): Observable<Journey[]> {
    return this.initialize().pipe(
      map((flightsAPI: Flight[]) => {
        const journeys: Journey[] = [];
        const currentRoute: Flight[] = [];
        this.findRoutesRecursive(origin, destination, maxStops, currentRoute, journeys, flightsAPI);
        return this.updateJourney(journeys, origin, destination);

      })
    );
  }

  /**
   * function to find routes recursively, find all the routes between origin and destination with max stops allowed 
   * @param origin city code origin
   * @param destination city code destination
   * @param maxStops number of max stops allowed
   * @param currentRoute array of flights
   * @param routes array of journeys
   * @returns Observable<Journey[]>
   */
  private findRoutesRecursive(
    currentLocation: string,
    destination: string,
    maxStops: number,
    currentRoute: Flight[],
    journeys: Journey[],
    flightsAPI: Flight[]
  ) {
    if (maxStops < 0) {
      return;
    }

    if (currentLocation === destination) {
      let newJourney = new Journey();
      newJourney.flights = [...currentRoute];
      journeys.push(newJourney);
      return;
    }

    for (const flight of flightsAPI) {
      if (flight.origin === currentLocation) {
        currentRoute.push(flight);
        this.findRoutesRecursive(flight.destination!, destination, maxStops - 1, currentRoute, journeys, flightsAPI);
        currentRoute.pop();
      }

    }
  }

  /**
   * update attributes of Journey array and update price
   * @param journey array of journeys to update
   * @param origin location origin
   * @param destination location destination
   * @returns Journey[] updated array of journeys
   */
  updateJourney(journey: Journey[], origin: string, destination: string): Journey[] {

    for (const j of journey) {
      j.origin = origin;
      j.destination = destination;
      j.updatePrice();
    }
    return journey;
  }

}
