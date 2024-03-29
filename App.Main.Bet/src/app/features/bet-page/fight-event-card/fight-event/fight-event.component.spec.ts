import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ICard, IEvent } from 'src/app/shared/models/ufc-events.model';
import { IBet } from 'src/app/shared/models/bet.model';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';

import { FightEventComponent } from './fight-event.component';
import { HttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthGuard } from 'src/app/features/auth/auth.guard';
import { SignupUserCredTestData } from 'src/app/shared/test-data/SignupUserCredentialsTestData';
import { selectUserID } from 'src/app/app-state/selectors/user.selectors';
import { BetService } from '../../bet.service';
import { of, throwError } from 'rxjs';

import { BetPlacementType } from './fight-event.enum';

describe('FightEventComponent', () => {
  let component: FightEventComponent;
  let fixture: ComponentFixture<FightEventComponent>;
  let ufc271EventName: string = ufcTestDataTS[0].eventName;
  let ufc271TestEvents: IEvent[] = ufcTestDataTS[0].eventCards[0].cardEvents;
  let ufc271TestCard: ICard = ufcTestDataTS[0].eventCards[0];

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;
  let messageService: MessageService;

  let betService: BetService;

  let testBet1: IBet = {
    userID: '9GnElKRIxogCoyFcms0JmYuM4SS2',
    eventName: 'UFC 271',
    cardType: 'Main Card',
    eventWeightClass: 'Middleweight',
    selectedFighter: 'Robert Wittaker',
    eventMatchUp: 'Israel Adesanya_vs_Robert Wittaker',
  };

  const placeBetReturn = {
    eventName: 'UFC 271',
    cardType: 'Main Card',
    eventWeightClass: 'Middleweight',
    selectedFighter: 'Robert Wittaker',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AvatarModule,
        CardModule,
        FormsModule,
        RadioButtonModule,
        ToastModule,
      ],
      providers: [
        BetService,
        MessageService,
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [
            {
              selector: selectUserID,
              value: SignupUserCredTestData.user.uid,
            },
          ],
        }),
      ],
      declarations: [FightEventComponent],
    }).compileComponents();

    betService = TestBed.inject(BetService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    store = TestBed.inject(MockStore);
    messageService = TestBed.inject(MessageService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(FightEventComponent);
    component = fixture.componentInstance;

    component.ufcFightEvents = ufc271TestEvents;
    component.eventTime = new Date(ufc271TestCard.eventTime);
    component.eventName = ufc271EventName;
    component.cardType = ufc271TestCard.cardType;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized with correct data', () => {
    expect(component.selectedFighter.length).toEqual(2);
    expect(component.selectedFighter).toEqual([
      'Robert Wittaker',
      'Derrick Lewis',
    ]);
  });

  it(`should populate the ${ufc271TestEvents.length} cards`, () => {
    const cardElement: HTMLElement = fixture.nativeElement;

    let cardList = cardElement.querySelectorAll('.p-card');

    for (let i = 0; i < cardList.length; i++) {
      let fighterAvatarList = cardList[i].querySelectorAll('.p-avatar img');

      // query selector requires "?" because it can be potentiall null
      // but the expect needs the "!" at the end to gaurantee it will not be
      let cardTitle = cardList[i]
        .querySelector('.p-card-title')
        ?.textContent!.trim()!;

      let fighter1Avatar = fighterAvatarList[0].getAttribute('src')!.trim()!;
      let fighter1Name = cardList[i]
        .querySelector('.fighter1Name')
        ?.textContent!.trim()!;
      let fighter1Record = cardList[i]
        .querySelector('.fighter1Record')
        ?.textContent!.trim()!;
      let fighter1RadioButton: HTMLElement = cardList[i].querySelector(
        '.fighter1RadioButton input'
      )!;

      let fighter2Avatar = fighterAvatarList[1].getAttribute('src')!.trim()!;
      let fighter2Name = cardList[i]
        .querySelector('.fighter2Name')
        ?.textContent!.trim()!;
      let fighter2Record = cardList[i]
        .querySelector('.fighter2Record')
        ?.textContent!.trim()!;
      let fighter2RadioButton: HTMLElement = cardList[i].querySelector(
        '.fighter2RadioButton input'
      )!;

      expect(cardTitle).toContain(ufc271TestEvents[i].eventWeightClass);

      // fighter 1 comparisons
      expect(fighter1Avatar).toEqual(
        ufc271TestEvents[i].eventFighter1.fighterImage
      );
      expect(fighter1Name).toEqual(
        ufc271TestEvents[i].eventFighter1.fighterName
      );
      expect(fighter1Record).toEqual(
        ufc271TestEvents[i].eventFighter1.fighterRecord
      );

      // testing radio button name (i.e. group of radio buttons that can only have 1 selected)
      expect(fighter1RadioButton.getAttribute('name')).toEqual(
        `${ufc271TestEvents[i].eventFighter1.fighterName}vs${ufc271TestEvents[i].eventFighter2.fighterName}`
      );

      // testing radio button value (i.e. the radio button identifier which is used to determine which one is checked)
      expect(fighter1RadioButton.getAttribute('value')).toEqual(
        `${ufc271TestEvents[i].eventFighter1.fighterName}`
      );

      // testing radio button selected fighter, which is which radio button should be checked (based on radio button value)
      expect(component.selectedFighter[i]).toEqual(
        `${ufc271TestEvents[i].selectedFighter}`
      );

      // The only fighter who has a bet is Robert Wittaker, who is a fighter 2
      expect(fighter2RadioButton.getAttribute('aria-checked')).toBeFalse;

      // fighter 2 comparisons
      expect(fighter2Avatar).toEqual(
        ufc271TestEvents[i].eventFighter2.fighterImage
      );
      expect(fighter2Name).toEqual(
        ufc271TestEvents[i].eventFighter2.fighterName
      );

      // testing radio button name (i.e. group of radio buttons that can only have 1 selected)
      expect(fighter2RadioButton.getAttribute('name')).toEqual(
        `${ufc271TestEvents[i].eventFighter1.fighterName}vs${ufc271TestEvents[i].eventFighter2.fighterName}`
      );

      // testing radio button value (i.e. the radio button identifier which is used to determine which one is checked)
      expect(fighter2RadioButton.getAttribute('value')).toEqual(
        `${ufc271TestEvents[i].eventFighter2.fighterName}`
      );

      // Robert Wittaker is the only fighter selected for a bet in the test data
      if (fighter2RadioButton.getAttribute('value') == 'Robert Wittaker') {
        // check the radio button is checked
        expect(fighter2RadioButton.getAttribute('aria-checked')).toBeTrue;
      } else {
        expect(fighter2RadioButton.getAttribute('aria-checked')).toBeFalse;
      }
    }
  });

  it('onPlaceBet should create bet objects as expected', () => {
    component.onPlaceBet(0);
    expect(component.betPlacement).toEqual(testBet1);
  });

  it('callServiceAddBet() should be called through onPlaceBet()', () => {
    spyOn(component, 'callServiceAddBet');
    component.previousSelectedFighter[0] = 'testfighter';
    component.onPlaceBet(0);
    expect(component.callServiceAddBet).toHaveBeenCalled();
  });

  it('should callServiceAddBet', () => {
    spyOn(betService, 'placeBet').and.returnValue(of(placeBetReturn));
    spyOn(component, 'toastSuccess');

    component.callServiceAddBet(testBet1, 1);

    expect(betService.placeBet).toHaveBeenCalled();
    expect(component.toastSuccess).toHaveBeenCalled();
  });

  it('should callServiceAddBet with error', () => {
    spyOn(betService, 'placeBet').and.returnValue(
      throwError(() => {
        new Error('test');
      })
    );
    spyOn(component, 'toastError');

    component.callServiceAddBet(testBet1, 1);

    expect(betService.placeBet).toHaveBeenCalled();
    expect(component.toastError).toHaveBeenCalled();
  });

  it('should add toast error message', () => {
    spyOn(messageService, 'add');

    component.toastError(0);

    expect(messageService.add).toHaveBeenCalled();
  });

  it('should add toast success message', () => {
    spyOn(messageService, 'add');

    component.toastSuccess(0, BetPlacementType.BetPlacement);

    expect(messageService.add).toHaveBeenCalled();
  });

  it('should callServiceRemoveBet', () => {
    spyOn(betService, 'removeBet').and.returnValue(of(placeBetReturn));
    spyOn(component, 'toastSuccess');

    component.callServiceRemoveBet(testBet1, 1);

    expect(betService.removeBet).toHaveBeenCalled();
    expect(component.toastSuccess).toHaveBeenCalled();
  });

  it('should callServiceRemoveBet', () => {
    spyOn(betService, 'removeBet').and.returnValue(
      throwError(() => {
        new Error('test');
      })
    );

    spyOn(component, 'toastError');

    component.callServiceRemoveBet(testBet1, 1);

    expect(betService.removeBet).toHaveBeenCalled();
    expect(component.toastError).toHaveBeenCalled();
  });

  it('should add toast success message', () => {
    spyOn(messageService, 'add');

    component.toastSuccess(0, BetPlacementType.BetRemoval);

    expect(messageService.add).toHaveBeenCalled();
  });

  // Can't figure out how to call onPlaceBet through radio button click
  // it('should place bet when radio button clicked', fakeAsync(() => {
  //   const cardElement: HTMLElement = fixture.nativeElement;
  //   let cardList = cardElement.querySelectorAll('.p-card');

  //   // const fightEventComponentSpy = jasmine.createSpyObj('FightEventComponent', [
  //   //   'clickEvent',
  //   //   'onPlaceBet',
  //   // ]);

  //   // const fightEventComponentSpy = spyOn(component, 'onPlaceBet').withArgs(0);
  //   const fightEventComponentSpy = spyOn(component, 'onPlaceBet')
  //     .withArgs(0)
  //     .and.callThrough();

  //   for (let i = 0; i < cardList.length; i++) {
  //     let fighter1RadioButton: HTMLElement = cardList[i].querySelector(
  //       '.fighter1RadioButton'
  //     )!;
  //     console.log(`"fighter1 radio button: " ${fighter1RadioButton}`);
  //     // fighter1RadioButton.nativeElement.triggerEventHandler('change', { target: fighter1RadioButton.nativeElement });
  //     fighter1RadioButton.click();

  //     tick();

  //     console.log(fightEventComponentSpy);
  //     // expect(fightEventComponentSpy.prototype).toHaveBeenCalled();
  //   }
  // }));
});
