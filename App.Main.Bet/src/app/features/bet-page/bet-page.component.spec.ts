import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Accordion, AccordionModule, AccordionTab } from 'primeng/accordion';

import { BetPageComponent } from './bet-page.component';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import { BetService } from './bet.service';
import { HttpClient } from '@angular/common/http';
import { asyncData } from 'src/app/shared/test-helpers/async-observable-helpers';

describe('BetPageComponent', () => {
  let component: BetPageComponent;
  let fixture: ComponentFixture<BetPageComponent>;
  let store: MockStore;

  let betService: BetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const initialState = ufcTestDataTS;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      declarations: [BetPageComponent, Accordion, AccordionTab],
      imports: [AccordionModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        BetService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    betService = TestBed.inject(BetService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(asyncData(ufcTestDataTS));

    fixture = TestBed.createComponent(BetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create bet page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit load initial data on UFC Events', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ufcEvents).toEqual(ufcTestDataTS);
      console.log('init data');
      console.log(component.ufcEvents);
    });
  });

  it('should create accordian', () => {
    const betPageElement: HTMLElement = fixture.nativeElement;

    let betAccordian = betPageElement.querySelector('.p-accordion');
    expect(betAccordian).toBeTruthy();
  });

  it('should populate accordian headers', () => {
    // let accordion: Accordion;

    // const betPageElement: HTMLElement = fixture.nativeElement;

    // fixture.detectChanges();
    // fixture.whenRenderingDone().then(() => {
    //   accordion = betPageElement.querySelector('.p-accordion');

    //   console.log('test outputs: ');
    //   console.log(accordion.initTabs);
    //   console.log(accordion.tabs);
    // });

    const betPageElement: HTMLElement = fixture.nativeElement;
    fixture.whenRenderingDone().then(() => {
      let betAccordian = betPageElement.querySelector('.p-accordion');
      // Seems like the data to bind is not loading. Try running a service stub to get the data before pulling the accordian.
      console.log('test outputs: ');
      console.log(betAccordian);
      console.log(component.ufcEvents);
    });

    // let betAccordian = betPageElement.querySelectorAll(
    //   '.p-accordion-header-text'
    // );

    // .ng-reflect-header

    // expect(betAccordian).toBeTruthy();
  });
});
