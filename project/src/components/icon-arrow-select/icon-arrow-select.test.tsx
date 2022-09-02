import React from 'react';
import { render, screen } from '@testing-library/react';
import IconArrowSelect from './icon-arrow-select';

describe('Component: Icon', () => {
  it('Component rendered', () => {

    render(<IconArrowSelect />);

    expect(screen.getByTestId('arrow')).not.toBeNull();
  });
});
