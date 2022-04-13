import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabView, TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';

import { FightEventCardComponent } from './fight-event-card.component';
import { FightEventComponent } from './fight-event/fight-event.component';

describe('FightEventCardComponent', () => {
  let componentUFC271: FightEventCardComponent;
  let fixtureUFC271: ComponentFixture<FightEventCardComponent>;

  let componentUFC272: FightEventCardComponent;
  let fixtureUFC272: ComponentFixture<FightEventCardComponent>;

  let ufc271Cards = ufcTestDataTS[0].eventCards;
  let ufc272Cards = ufcTestDataTS[1].eventCards;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AvatarModule,
        CardModule,
        FormsModule,
        RadioButtonModule,
        TabMenuModule,
        TabViewModule,
        ToastModule,
      ],
      providers: [
        MessageService,
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [],
        }),
      ],
      declarations: [FightEventCardComponent, FightEventComponent],
    }).compileComponents();

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();

    fixtureUFC271 = TestBed.createComponent(FightEventCardComponent);
    componentUFC271 = fixtureUFC271.componentInstance;
    componentUFC271.ufcEventCards = ufcTestDataTS[0].eventCards;

    fixtureUFC272 = TestBed.createComponent(FightEventCardComponent);
    componentUFC272 = fixtureUFC272.componentInstance;
    componentUFC272.ufcEventCards = ufcTestDataTS[1].eventCards;

    fixtureUFC271.detectChanges();
    fixtureUFC272.detectChanges();
  });

  describe('UFC 271', () => {
    it('should create', () => {
      expect(componentUFC271).toBeTruthy();
    });

    it('should create 3 tabs for UFC 271', () => {
      const cardTabElement: HTMLElement = fixtureUFC271.nativeElement;

      let cardTabView = cardTabElement.querySelectorAll('.p-tabview-nav li a');
      expect(cardTabView.length).toEqual(3);
    });

    it('should create 3 proper tab titles UFC 271', () => {
      const cardTabElement: HTMLElement = fixtureUFC271.nativeElement;

      let cardTabView = cardTabElement.querySelectorAll('.p-tabview-nav li a');

      for (let i = 0; i < cardTabView.length; i++) {
        let hour = new Date(ufc271Cards[i].eventTime).getHours();
        let hourType = hour >= 12 ? 'PM' : 'AM';
        expect(cardTabView[i].textContent).toEqual(
          `${ufc271Cards[i].cardType} - ${hour - 12}${hourType}`
        );
      }
    });

    it('should highlight main tab', () => {
      const cardTabElement: HTMLElement = fixtureUFC271.nativeElement;

      let cardTab = cardTabElement.querySelector(
        '.p-tabview-nav li.p-highlight'
      );

      let hour = new Date(ufc271Cards[0].eventTime).getHours();
      let hourType = hour >= 12 ? 'PM' : 'AM';

      expect(cardTab?.textContent).toEqual(
        `${ufc271Cards[0].cardType} - ${hour - 12}${hourType}`
      );
    });
  });

  describe('UFC 272', () => {
    it('should create', () => {
      expect(componentUFC271).toBeTruthy();
    });

    it('should create 2 tabs for UFC 272', () => {
      const cardTabElement: HTMLElement = fixtureUFC272.nativeElement;

      let cardTabView = cardTabElement.querySelectorAll('.p-tabview-nav li a');
      expect(cardTabView.length).toEqual(2);
    });

    it('should create 2 proper tab titles UFC 272', () => {
      const cardTabElement: HTMLElement = fixtureUFC272.nativeElement;

      let cardTabView = cardTabElement.querySelectorAll('.p-tabview-nav li a');

      for (let i = 0; i < cardTabView.length; i++) {
        let hour = new Date(ufc272Cards[i].eventTime).getHours();
        let hourType = hour >= 12 ? 'PM' : 'AM';
        expect(cardTabView[i].textContent).toEqual(
          `${ufc272Cards[i].cardType} - ${hour - 12}${hourType}`
        );
      }
    });

    it('should highlight main tab', () => {
      const cardTabElement: HTMLElement = fixtureUFC272.nativeElement;

      let cardTab = cardTabElement.querySelector(
        '.p-tabview-nav li.p-highlight'
      );

      let hour = new Date(ufc272Cards[0].eventTime).getHours();
      let hourType = hour >= 12 ? 'PM' : 'AM';

      expect(cardTab?.textContent).toEqual(
        `${ufc272Cards[0].cardType} - ${hour - 12}${hourType}`
      );
    });
  });
});
