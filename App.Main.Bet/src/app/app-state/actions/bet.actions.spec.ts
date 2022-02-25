import * as betActions from './bet.actions';

describe('Bet Action', () => {
  it('should return an action', () => {
    expect(betActions.retrievedUFCEvents.type).toBe(
      '[UFC Events/API] Retrieve UFC Events Success'
    );
  });
});
