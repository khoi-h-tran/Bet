import { User } from '../models/user.model';

export const unAuthUserTestData: User = new User(
  'initialUserName',
  'initialEmail',
  '9GnElKRIxogCoyFcms0JmYuM4SS2',
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNGY4N2ZmNWQ5M2ZhNmVhMDNlNWM2ZTg4ZWVhMGFjZDJhMjMyYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Im',
  'initialRefreshToken'
);

export const authUserTestData: User = new User(
  'AuthorizedUserName',
  'AuthorizedEmail',
  'AuthorizedUserID',
  'AuthorizedAccessToken',
  'AuthorizedRefreshToken'
);
