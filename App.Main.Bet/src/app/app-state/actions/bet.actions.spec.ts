import * as fromBet from './bet.actions';

describe('betBets', () => {
  it('should return an action', () => {
    expect(fromBet.retrievedUFCEvents.type).toBe(
      '[UFC Events/API] Retrieve UFC Events Success'
    );
  });
});
