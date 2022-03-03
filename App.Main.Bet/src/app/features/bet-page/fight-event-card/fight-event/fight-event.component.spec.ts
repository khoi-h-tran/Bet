import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { IEvent } from 'src/app/shared/models/ufc-events.model';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';

import { FightEventComponent } from './fight-event.component';

describe('FightEventComponent', () => {
  let component: FightEventComponent;
  let fixture: ComponentFixture<FightEventComponent>;
  let ufc271TestEvents: IEvent[] = ufcTestDataTS[0].eventCards[0].cardEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarModule, CardModule],
      declarations: [FightEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FightEventComponent);
    component = fixture.componentInstance;

    component.ufcFightEvents = ufc271TestEvents;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

      let fighter2Avatar = fighterAvatarList[1].getAttribute('src')!.trim()!;
      let fighter2Name = cardList[i]
        .querySelector('.fighter2Name')
        ?.textContent!.trim()!;
      let fighter2Record = cardList[i]
        .querySelector('.fighter2Record')
        ?.textContent!.trim()!;

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

      // fighter 2 comparisons
      expect(fighter2Avatar).toEqual(
        ufc271TestEvents[i].eventFighter2.fighterImage
      );
      expect(fighter2Name).toEqual(
        ufc271TestEvents[i].eventFighter2.fighterName
      );
      expect(fighter2Record).toEqual(
        ufc271TestEvents[i].eventFighter2.fighterRecord
      );
    }
  });
});
