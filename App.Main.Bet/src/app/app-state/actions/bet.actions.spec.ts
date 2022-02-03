import * as fromBet from './bet.actions';

describe('betBets', () => {
  it('should return an action', () => {
    expect(fromBet.betBets().type).toBe('[Bet] Bet Bets');
  });
});
