import { User } from '../models/user.model';

export const unAuthUserTestData: User = new User(
  'initialUserName',
  'initialEmail',
  'initialUserID',
  '',
  'initialRefreshToken'
);

export const authUserTestData: User = new User(
  'AuthorizedUserName',
  'AuthorizedEmail',
  'AuthorizedUserID',
  'AuthorizedAccessToken',
  'AuthorizedRefreshToken'
);
