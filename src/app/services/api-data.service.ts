import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Journey } from '../models/journey.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private api_url = environment.API_URL;

  constructor(private http: HttpClient) { }

  getJourneys(origin: string, destination: string, maxStops: number, currency: string): Observable<Journey[]> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('maxStops', maxStops.toString())
      .set('currency', currency);

    return this.http.get<Journey[]>(`${this.api_url}/Journey/GetJourneys`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching journey data:', error);
        return of([]);
      })
    );
  }
}
