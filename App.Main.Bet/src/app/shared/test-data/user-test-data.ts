import { User } from '../models/user.model';

export const userTestData: User = new User(
  'testUserName',
  'testEmail',
  'testUserID',
  'testAccessToken',
  'testRefreshToken'
);
