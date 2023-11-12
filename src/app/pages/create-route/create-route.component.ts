import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Journey } from 'src/app/models/journey.model';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent {

  form: FormGroup = new FormGroup({});
  journeys: Journey[] = [];
  message: string = '';
  loading: boolean = false;

  constructor(
    private _journeyService: ApiDataService
  ) {
    this.form = new FormGroup({
      origin: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
      destination: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
      maxStops: new FormControl(1, [Validators.required, Validators.pattern('[1-9][0-9]*'), Validators.minLength(1)]),
      currency: new FormControl('USD', [Validators.required])

    });

  }

  /**
   * get the journeys from JourneyService and set currency to journeys array according to the selected value in the form
   * @returns void
   * 
  */
  getJourneys() {

    if (!this.validateErrors()) {

      if (this.form.valid) {
        this.journeys = [];
        this.loading = true;


        this._journeyService.getJourneys(this.form.value.origin.toUpperCase(), this.form.value.destination.toUpperCase(), this.form.value.maxStops, this.form.value.currency)
          .subscribe((journeys: Journey[]) => {
            this.message = '';
            journeys.length == 0 ? this.message = "No se encontraron rutas" : this.message = '';
            journeys.sort((a, b) => a.price! - b.price!);
            this.journeys = journeys;
            console.log(journeys);
            this.loading = false;
          });
      }
    }
  }

  /**
   * Validate the form fields
   * @returns true if there is an error, false if there is not
   * 
   */

  validateErrors(): boolean {

    const inputOrigin = this.form.value.origin.trim();
    const inputDestination = this.form.value.destination.trim();
    if (!this.form.value.maxStops) {
      this.message = "El número máximo de vuelos debe ser mayor a 0";
    } else if (!inputOrigin || !inputDestination) {
      this.message = "Los campos son obligatorios";
    } else if (inputOrigin.toUpperCase() === inputDestination.toUpperCase()) {
      this.message = "El origen y el destino no pueden ser iguales";
    } else if (inputOrigin.length !== 3 || inputDestination.length !== 3) {
      this.message = "El origen y el destino deben tener 3 caracteres";
    } else {
      return false;
    }

    this.journeys = [];
    this.loading = false;
    return true;
  }


}
