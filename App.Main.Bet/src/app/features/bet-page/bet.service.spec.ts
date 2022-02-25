import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  asyncData,
  asyncError,
} from '../../shared/test-helpers/async-observable-helpers';

import { BetService } from './bet.service';
import { IUFCEvents } from '../../shared/models/ufc-events.model';

describe('BetService', () => {
  let betService: BetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [BetService, { provide: HttpClient, useValue: httpClientSpy }],
    });

    betService = TestBed.inject(BetService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(betService).toBeTruthy();
  });

  it('should return expected UFC Events (HttpClient called once)', (done: DoneFn) => {
    const expectedUFCEvent: IUFCEvents[] = [
      {
        eventName: 'UFC 271',
        eventDate: new Date('2022-02-12'),
        eventVenue: 'Toyota Center',
        eventCards: [],
      },
      {
        eventName: 'UFC 272',
        eventDate: new Date('2022-03-05'),
        eventVenue: 'T-Mobile Arena',
        eventCards: [],
      },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedUFCEvent));

    betService.getUFCEvents().subscribe({
      next: (ufcEvents) => {
        expect(ufcEvents)
          .withContext('expected UFC events')
          .toEqual(expectedUFCEvent);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    betService.getUFCEvents().subscribe({
      next: (ufcEvents) => done.fail('expected an error, not ufc events'),
      error: (error) => {
        expect(error.message).toContain('test 404 error');
        done();
      },
    });
  });
});
