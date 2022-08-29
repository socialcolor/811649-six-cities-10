import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { fetchLoadCommentAction, fetchLoadNearbyOfferAction, fetchLoadOfferAction, fetchLoadOffersAction, fetchSendCommentAction } from '../api-actions';
import { changeFavoriteOffer, changeFavoritePropertyOffer, offersData } from './offers-data';

describe('Reducer offers data', () => {
  const state = {
    offers: [],
    propertyOffer: { isFavorite: true } as Offer,
    isDataLoaded: false,
    comment: null,
    nearbyOffers: [],
    formError: {
      sending: false,
      error: false,
    },
  };
  it('should add Favorite Offer', () => {
    const offerId = 1;
    expect(offersData.reducer(state, { type: changeFavoriteOffer.type, payload: offerId }))
      .toEqual(state);
  });

  it('should change Favorite PropertyOffer property isFavorite', () => {
    const changeFavoriteOfferState = { ...state, propertyOffer: { isFavorite: !state.propertyOffer.isFavorite } };
    expect(offersData.reducer(state, { type: changeFavoritePropertyOffer.type }))
      .toEqual(changeFavoriteOfferState);
  });

  it('should load offers pending', () => {
    expect(offersData.reducer(state, { type: fetchLoadOffersAction.pending }))
      .toEqual({ ...state, isDataLoaded: true });
  });

  it('should load offers fulfilled', () => {
    expect(offersData.reducer(state, { type: fetchLoadOffersAction.fulfilled, payload: [{} as Offer] }))
      .toEqual({ ...state, offers: [{} as Offer] });
  });

  it('should load offers rejected', () => {
    expect(offersData.reducer(state, { type: fetchLoadOffersAction.rejected }))
      .toEqual({ ...state, isDataLoaded: false });
  });

  it('should load offer pending', () => {
    expect(offersData.reducer(state, { type: fetchLoadOfferAction.pending }))
      .toEqual({ ...state, propertyOffer: null });
  });

  it('should load offer fulfilled', () => {
    expect(offersData.reducer(state, { type: fetchLoadOfferAction.fulfilled, payload: {} as Offer }))
      .toEqual({ ...state, propertyOffer: {} as Offer });
  });

  it('should load offer rejected', () => {
    expect(offersData.reducer(state, { type: fetchLoadOfferAction.rejected }))
      .toEqual({ ...state, propertyOffer: undefined });
  });

  it('should load comment fulfilled', () => {
    expect(offersData.reducer(state, { type: fetchLoadCommentAction.fulfilled, payload: [] as Reviews }))
      .toEqual({ ...state, comment: [] as Reviews });
  });

  it('should send comment sending pending', () => {
    expect(offersData.reducer(state, { type: fetchSendCommentAction.pending }))
      .toEqual({ ...state, formError: { ...state.formError, sending: true, error: false } });
  });

  it('should load comment when  fetchSendCommentAction.fulfilled', () => {
    expect(offersData.reducer(state, { type: fetchSendCommentAction.fulfilled, payload: [] as Reviews }))
      .toEqual({ ...state, comment: [] as Reviews, formError: { ...state.formError, sending: false, error: false } });
  });

  it('should load Nearby Offer', () => {
    expect(offersData.reducer(state, { type: fetchLoadNearbyOfferAction.fulfilled, payload: [{} as Offer] as Offers }))
      .toEqual({ ...state, nearbyOffers: [{} as Offer] as Offers});
  });

});
