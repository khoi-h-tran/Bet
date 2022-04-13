import { LoginUserCredTestData } from './LoginUserCredentialsTestData';

describe('Test Mock Data', () => {
  it('should return an access token', () => {
    expect(LoginUserCredTestData.user.getIdTokenResult()).toEqual(
      'testAccessToken'
    );
  });
});
