import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakerOffer } from '../../mock';
import SendCommentForm from './send-comment-form';

const offer = makeFakerOffer();
const makeStore = configureMockStore();
describe('Component: send comment form', () => {
  it('button disabled', () => {
    const store = makeStore({
      DATA: {
        formError: {
          sending: false,
          error: false,
        }
      }
    });
    render(
      <Provider store={store} >
        <SendCommentForm offerId={offer.id} />
      </Provider>
    );

    expect(screen.getByTestId('button')).toBeDisabled();
  });
});
