import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as betSelectors from './bet.selectors';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';

describe('Bet Selectors', () => {
  let store: MockStore;
  const initialState = { ufcEvents: ufcTestDataTS };
  let ufcEventsFromSelector: ReadonlyArray<IUFCEvents> = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return a selection of UFC events', () => {
    store
      .select(betSelectors.selectUFCEvents)
      .subscribe((ufcEvents) => (ufcEventsFromSelector = ufcEvents));
    expect(ufcEventsFromSelector).toEqual(ufcTestDataTS);
  });
});
