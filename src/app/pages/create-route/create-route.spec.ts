import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRouteComponent } from './create-route.component';
import { JourneyService } from 'src/app/services/journey.service';
import { Journey } from 'src/app/models/journey.model';

describe('CreateRouteComponent', () => {
  let component: CreateRouteComponent;
  let fixture: ComponentFixture<CreateRouteComponent>;
  let journeyServiceSpy: jasmine.SpyObj<JourneyService>;

  beforeEach(() => {
    
    journeyServiceSpy = jasmine.createSpyObj('JourneyService', ['findRoutesWithStops']);

    TestBed.configureTestingModule({
      declarations: [CreateRouteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: JourneyService, useValue: journeyServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(CreateRouteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currency for journeys on currency change', () => {
   
    const mockJourneys: Journey[] = [
      { 
        flights: [], 
        origin: 'Origin1', 
        destination: 'Destination1', 
        price: 100, 
        currency: "USD", 
        updatePrice: () => {},  
        setCurrency: jasmine.createSpy('setCurrency') 
      },
      { 
        flights: [], 
        origin: 'Origin2', 
        destination: 'Destination2', 
        price: 150, 
        currency: "USD",  
        updatePrice: () => {}, 
        setCurrency: jasmine.createSpy('setCurrency')  
      },
    ];

    component.journeys = mockJourneys;

    
    const event = { target: { value: 2 } };
    component.onCurrencyChangeCurrency(event);

    
    expect(mockJourneys[0].setCurrency).toHaveBeenCalledWith(2);
    expect(mockJourneys[1].setCurrency).toHaveBeenCalledWith(2);
  });

  
});
