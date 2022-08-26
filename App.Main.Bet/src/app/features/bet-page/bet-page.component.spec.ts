import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Accordion, AccordionModule, AccordionTab } from 'primeng/accordion';

import { BetPageComponent } from './bet-page.component';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import { BetService } from './bet.service';
import { HttpClient } from '@angular/common/http';
// import { asyncData } from 'src/app/shared/test-helpers/async-observable-helpers';
import { of } from 'rxjs';
import { selectUFCEvents } from 'src/app/app-state/selectors/bet.selectors';
import { retrievedUFCEvents } from 'src/app/app-state/actions/bet.actions';
import { FightEventCardComponent } from './fight-event-card/fight-event-card.component';
import { FightEventComponent } from './fight-event-card/fight-event/fight-event.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { selectUserID } from 'src/app/app-state/selectors/user.selectors';
import { LoginUserCredTestData } from 'src/app/shared/test-data/LoginUserCredentialsTestData';
import { MockDataSnapShot } from 'src/app/shared/test-data/MockDataSnapShotVal';
import { MockUFCEventsDataSnapShot } from 'src/app/shared/test-data/MockDataSnapShotVal';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { mockEventsWithBets } from 'src/app/shared/test-data/MockEventsWithBets';

describe('BetPageComponent', () => {
  let component: BetPageComponent;
  let fixture: ComponentFixture<BetPageComponent>;
  let store: MockStore;
  let getUFCEventsSpy: jasmine.Spy;
  let betService: BetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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
        ScrollPanelModule,
        TabMenuModule,
        TabViewModule,
        ToastModule,
      ],
      providers: [
        BetService,
        MessageService,
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [
            {
              selector: selectUFCEvents,
              value: mockEventsWithBets,
            },
            {
              selector: selectUserID,
              value: LoginUserCredTestData.user.uid,
            },
          ],
        }),
      ],
    }).compileComponents();

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    betService = TestBed.inject(BetService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BetPageComponent);
    component = fixture.componentInstance;
    component.ufcEvents = ufcTestDataTS;

    spyOn(store, 'dispatch')
      .withArgs(
        retrievedUFCEvents({ retrievedUFCEventsData: mockEventsWithBets })
      )
      .and.callThrough();
    spyOn(betService, 'getUsersBets').and.returnValue(of(MockDataSnapShot));
    // spyOn(betService, 'getUFCEvents').and.returnValue(of(ufcTestDataTS));
    // spyOn(betService, 'getUFCEvents');
    spyOn(betService, 'getUFCEvents').and.returnValue(
      of(MockUFCEventsDataSnapShot)
    );

    fixture.detectChanges();
  });

  it('should create bet page component', () => {
    expect(component).toBeTruthy();
  });

  // can't call this, because I can't mock a datasnapshot
  // it('should add ufc events to state', () => {
  //   expect(store.dispatch).toHaveBeenCalled();
  //   // expect(store.dispatch).toHaveBeenCalledWith(
  //   //   retrievedUFCEvents({ retrievedUFCEventsData: mockEventsWithBets })
  //   // );
  // });

  it('should create bet page component with instantiated test data', () => {
    expect(betService.getUFCEvents).toHaveBeenCalled();
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
