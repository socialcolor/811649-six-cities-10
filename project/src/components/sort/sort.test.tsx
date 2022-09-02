import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SortName } from '../../const';
import Sort from './sort';

const makeStore = configureMockStore();
describe('Component: Sort', () => {

  it('Sort name', () => {
    const store = makeStore({
      FILTER: {
        currentSort: SortName.Popular,
      }
    });
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    expect(screen.getAllByText(SortName.Popular)).not.toBeNull();
  });
});
