import { IUFCEvents } from '../shared/models/ufc-events.model';

export interface AppState {
  user: UserState;
  bet: BetState;
}

export interface BetState {
  ufcEvents: ReadonlyArray<IUFCEvents>;
}

export interface UserState {
  userName: string;
  login: string;
}
