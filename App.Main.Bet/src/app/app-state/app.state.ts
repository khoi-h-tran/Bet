import { IUFCEvents } from '../shared/models/ufc-events.model';

export interface IAppState {
  user: IUserState;
  bet: IBetState;
}

export interface IBetState {
  ufcEvents: ReadonlyArray<IUFCEvents>;
}

export interface IUserState {
  userName: string;
  login: string;
}
