import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
      maxStops: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      currency: new FormControl(1, [Validators.required])

    });

  }

  getJourneys() {

    if (!this.validateErrors()) {

      this._journeyService.findRoutesWithStops(this.form.value.origin.toUpperCase(), this.form.value.destination.toUpperCase(), this.form.value.maxStops)
        .subscribe((journeys: Journey[]) => {
          this.message = '';
          this.loading = true;
          this.journeys = journeys;
          this.loading = false;
          if (this.journeys.length == 0) {
            this.message = "No se encontraron rutas";
          }else{
            this.setCurrency(this.form.value.currency);
          }
        });

    }

  }

  validateErrors(): boolean {
    if (this.form.valid && this.form.value.origin != this.form.value.destination) {
      return false;
    }
    else if (!this.form.value.origin || !this.form.value.destination) {
      this.message = "Los campos son obligatorios";
      this.journeys = [];
      this.loading = false;
      return true;
    } else if (this.form.value.origin.toUpperCase() == this.form.value.destination.toUpperCase()) {
      this.message = "El origen y el destino no pueden ser iguales";
      this.journeys = [];
      this.loading = false;
      return true;
    } else if (this.form.value.origin != 3 || this.form.value.destination != 3) {
      this.message = "El origen y el destino deben ser de 3 caracteres";
      this.journeys = [];
      this.loading = false;
      return true;
    } else {
      this.message = "Datos invalidos";
      this.journeys = [];
      this.loading = false;
      return true;
    }
  }


  onCurrencyChangeCurrency(event: any) {
    if (this.journeys.length != 0) {
      const selectedValue = event.target.value;
      this.setCurrency(selectedValue);
      console.log(this.journeys);

    }
  }

  setCurrency(tipo: number) {
    this.journeys.forEach((journey: Journey) => {
      journey.setCurrency(tipo);
    });
  }



}
