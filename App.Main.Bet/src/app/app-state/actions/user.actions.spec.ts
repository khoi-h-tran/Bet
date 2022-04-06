import * as fromUser from './user.actions';

describe('loadUser', () => {
  it('should return an action', () => {
    expect(fromUser.loadUser.type).toBe('[User] Load Users');
  });
});
