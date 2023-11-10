import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, max } from 'rxjs';
import { Journey } from 'src/app/models/journey.model';
import { JourneyService } from 'src/app/services/journey.service';

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
    private _journeyService: JourneyService
  ) {
    this.form = new FormGroup({
      origin: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
      destination: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
      maxStops: new FormControl(1, [Validators.required, Validators.pattern('[1-9][0-9]*'), Validators.minLength(1)]),
      currency: new FormControl(1, [Validators.required])

    });

  }

  /**
   * get the journeys from JourneyService and set currency to journeys array according to the selected value in the form
   * @returns void
   * 
  */
  getJourneys() {

    if (!this.validateErrors()) {

      this.form.value.maxStops ? this.message = '' : this.message = "El número máximo de vuelos debe ser mayor a 0";

      if (this.form.valid) {
        this.loading = true;

        this._journeyService.findRoutesWithStops(this.form.value.origin.toUpperCase(), this.form.value.destination.toUpperCase(), this.form.value.maxStops)
          .subscribe((journeys: Journey[]) => {
            this.message = '';

            if (journeys.length == 0) {
              this.message = "No se encontraron rutas";
            }
            this.setCurrency(Number(this.form.value.currency), journeys);
            journeys.sort((a, b) => a.price - b.price);
            this.journeys = journeys;
            this.loading = false;
          });
      }
    }
  }

  /**
   * validate form fields
   * @returns boolean, true if there are errors, false if there are not
   * 
  */
  validateErrors(): boolean {

    const inputOrigin = this.form.value.origin.trim();
    const inputDestination = this.form.value.destination.trim();

    if (!inputOrigin || !inputDestination) {
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

  /**
   * set currency to journeys array according to the selected value in the form
   * @param event event from the select in the form
   * @returns void
   * 
  */
  onCurrencyChangeCurrency(event: any) {
    if (this.journeys.length != 0) {
      const selectedValue = event.target.value;
      this.setCurrency(selectedValue, this.journeys);
    }
  }

  /**
   * set currency to journeys array according to the selected value in the form
   * @param type type of currency
   * @returns void
   * 
  */

  setCurrency(type: number, journeys: Journey[]) {
    type = Number(type);
    journeys.forEach((journey: Journey) => {
      journey.setCurrency(type);
    });
  }

}
