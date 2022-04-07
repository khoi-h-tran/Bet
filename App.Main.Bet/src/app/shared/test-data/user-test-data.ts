import { User } from '../models/user.model';

export const userTestData: User = new User(
  'initialUserName',
  'initialEmail',
  'initialUserID',
  '',
  'initialRefreshToken'
);
