import { IUFCEvents } from '../shared/models/ufc-events.model';

export interface AppState {
  ufcEvents: Readonly<IUFCEvents>;
}
