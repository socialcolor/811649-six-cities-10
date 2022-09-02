import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loaging', () => {
  it('should render Loading', () => {

    render(<LoadingScreen />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
