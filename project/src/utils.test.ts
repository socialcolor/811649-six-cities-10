import { calcRating } from './utils';

describe('Utils test', () => {
  it('Calc rating', () => {
    const rating = 5;
    expect(calcRating(rating))
      .toBe('100%');
  });
});
