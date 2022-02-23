import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUFCEvents } from '../../shared/models/ufc-events.model';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  constructor(private http: HttpClient) {}

  getUFCEvents(): Observable<Array<IUFCEvents>> {
    return this.http.get<IUFCEvents[]>(
      'https://raw.githubusercontent.com/khoi-h-tran/TestJSONData/master/UFCEventsTestData.json'
    );
  }
}
