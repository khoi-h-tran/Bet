import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Accordion, AccordionModule, AccordionTab } from 'primeng/accordion';

import { BetPageComponent } from './bet-page.component';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import { BetService } from './bet.service';
import { HttpClient } from '@angular/common/http';
import { asyncData } from 'src/app/shared/test-helpers/async-observable-helpers';
import { of } from 'rxjs';
import { selectUFCEvents } from 'src/app/app-state/selectors/bet.selectors';
import { retrievedUFCEvents } from 'src/app/app-state/actions/bet.actions';
import { FightEventCardComponent } from './fight-event-card/fight-event-card.component';
import { FightEventComponent } from './fight-event-card/fight-event/fight-event.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

describe('BetPageComponent', () => {
  let component: BetPageComponent;
  let fixture: ComponentFixture<BetPageComponent>;
  let store: MockStore;
  let getUFCEventsSpy: jasmine.Spy;

  beforeEach(async () => {
    // Create a fake BetService object with a `getUFCEvents()` spy
    const betService = jasmine.createSpyObj('BetService', ['getUFCEvents']);

    // Make the spy return a synchronous Observable with the test data
    getUFCEventsSpy = betService.getUFCEvents.and.returnValue(
      of(ufcTestDataTS)
    );

    await TestBed.configureTestingModule({
      declarations: [
        Accordion,
        AccordionTab,
        BetPageComponent,
        FightEventCardComponent,
        FightEventComponent,
      ],
      imports: [
        AccordionModule,
        AvatarModule,
        BrowserAnimationsModule,
        CardModule,
        FormsModule,
        RadioButtonModule,
        TabMenuModule,
        TabViewModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUFCEvents,
              value: ufcTestDataTS,
            },
          ],
        }),
        { provide: BetService, useValue: betService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BetPageComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create bet page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have retrieve event with bet service, action, and selector called', () => {
    expect(getUFCEventsSpy.calls.any())
      .withContext('getUFCEvents called')
      .toBe(true);

    expect(store.dispatch).toHaveBeenCalledWith(
      retrievedUFCEvents({ retrievedUFCEventsData: ufcTestDataTS })
    );
  });

  it('should create bet page component with instantiated test data', () => {
    expect(component.ufcEvents).toEqual(ufcTestDataTS);
  });

  it('should create accordian', () => {
    const betPageElement: HTMLElement = fixture.nativeElement;

    let betAccordian = betPageElement.querySelector('.p-accordion');

    expect(component.activeState.length).toEqual(2);
    expect(component.activeState).toEqual([true, false]);
    expect(betAccordian).toBeTruthy();
  });

  it('should populate accordian headers', () => {
    const betPageElement = fixture.nativeElement;
    let betAccordianHeaders = betPageElement.querySelectorAll(
      '.p-accordion-header-text'
    );

    expect(betAccordianHeaders.length).toBe(2);
    expect(betAccordianHeaders[0].textContent).toEqual(
      ' UFC 271 - Feb 12, 2022 '
    );
    expect(betAccordianHeaders[1].textContent).toContain(
      ' UFC 272 - Mar 5, 2022 '
    );
  });
});
