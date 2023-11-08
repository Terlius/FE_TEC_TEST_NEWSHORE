import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journey.model';
import { FlightDataService } from 'src/app/services/flight-data.service';
import { JourneyService } from 'src/app/services/journey.service';

@Component({
  selector: 'app-flight-test',
  templateUrl: './flight-test.component.html',
  styleUrls: ['./flight-test.component.css']
})
export class FlightTestComponent {
  flights: any;
  

  constructor(private flightDataService: FlightDataService,
    private journeyService: JourneyService) { }

  ngOnInit(): void {
    this.flightDataService.getFlights().subscribe((data) => {
      this.flights = data;
    });
    
    
    this.journeyService.findRoutesWithStops('MZL', 'CAN', 10).subscribe((data: Journey[]) => {
    
    console.log(data);
    
    }
    );


  }
}
