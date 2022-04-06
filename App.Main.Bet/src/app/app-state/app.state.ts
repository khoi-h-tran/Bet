import { IUFCEvents } from '../shared/models/ufc-events.model';
import { User } from '../shared/models/user.model';

export interface IAppState {
  user: User;
  bet: IBetState;
}

export interface IBetState {
  ufcEvents: ReadonlyArray<IUFCEvents>;
}
