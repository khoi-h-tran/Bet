import * as fromStatistics from './statistics.actions';

describe('Statistics Actions', () => {
  it('should return an action', () => {
    expect(fromStatistics.statisticsStatisticss().type).toBe(
      '[Statistics] Statistics Statisticss'
    );
  });
});
