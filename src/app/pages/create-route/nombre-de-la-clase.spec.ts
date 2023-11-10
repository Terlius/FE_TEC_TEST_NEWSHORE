import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Journey } from 'src/app/models/journey.model';
import { JourneyService } from 'src/app/services/journey.service';
import { CreateRouteComponent } from './create-route.component';

describe('CreateRouteComponent', () => {
  let component: CreateRouteComponent;
  let fixture: ComponentFixture<CreateRouteComponent>;
  let journeyServiceStub: Partial<JourneyService>;

  beforeEach(() => {
    journeyServiceStub = {
      findRoutesWithStops: () => of([]), // You can customize this for your test cases
    };

    TestBed.configureTestingModule({
      declarations: [CreateRouteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: JourneyService, useValue: journeyServiceStub },
      ],
    });

    fixture = TestBed.createComponent(CreateRouteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.get('origin')).toBeTruthy();
    expect(component.form.get('destination')).toBeTruthy();
    expect(component.form.get('maxStops')).toBeTruthy();
    expect(component.form.get('currency')).toBeTruthy();
  });

  it('should call getJourneys() on form submission', () => {
    spyOn(component, 'getJourneys');
    const form = component.form;
    form.setValue({ origin: 'AAA', destination: 'BBB', maxStops: 2, currency: 1 });
    form.markAllAsTouched();;
    expect(component.getJourneys).toHaveBeenCalled();
  });

  it('should set currency for journeys on currency change', () => {
    spyOn(component, 'setCurrency');
    const event = { target: { value: 2 } };
    component.onCurrencyChangeCurrency(event);
    expect(component.setCurrency).toHaveBeenCalledWith(2, component.journeys);
  });

  it('should validate form fields', () => {
    // Test your validation logic here
    // For example:
    component.form.setValue({ origin: 'AAA', destination: 'BBB', maxStops: 2, currency: 1 });
    expect(component.validateErrors()).toBeFalsy(); // Assuming the form is valid in this case
  });

  

});
