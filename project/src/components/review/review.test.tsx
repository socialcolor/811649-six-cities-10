import { render, screen } from '@testing-library/react';
import {makeFakeReview} from '../../mock';
import Review from './review';

const review = makeFakeReview();
describe('Component: Review', () => {
  it('Render Review comment', () => {

    render(
      <Review review={review}/>
    );
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});
