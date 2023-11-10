import { Component, Input, OnInit } from '@angular/core';
import { Journey } from 'src/app/models/journey.model';

@Component({
  selector: 'app-card-journey',
  templateUrl: './card-journey.component.html',
  styleUrls: ['./card-journey.component.css']
})
export class CardJourneyComponent  {

@Input() journey!: Journey;
@Input() numJourney!: number;

}
