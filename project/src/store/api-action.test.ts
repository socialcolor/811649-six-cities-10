import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { APIRoute } from '../const';
import { checkAuthAction, fetchChangeFavorite, fetchLoadCommentAction, fetchLoadFavoriteAction, fetchLoadNearbyOfferAction, fetchLoadOfferAction, fetchLoadOffersAction, fetchSendCommentAction, loginAction, logoutAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirect } from './action';
import { Offer } from '../types/offer';
import { Comment, Reviews } from '../types/review';
import { Favorite } from '../types/favorite';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: 'a1' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirect.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-10', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-10');
  });

  it('should dispatch load offers when GET /hotels and server return Offers Array', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, [{} as Offer]);

    const store = mockStore();

    await store.dispatch(fetchLoadOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchLoadOffersAction.pending.type,
      fetchLoadOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch load offer when GET /hotels/:id and return Object Offer', async () => {
    const mockId = 1;
    const offerRout = APIRoute.Offer.replace(':id', (mockId).toString());
    mockAPI
      .onGet(offerRout)
      .reply(200, {} as Offer);

    const store = mockStore();

    await store.dispatch(fetchLoadOfferAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchLoadOfferAction.pending.type,
      fetchLoadOfferAction.fulfilled.type,
    ]);
  });

  it('should dispatch load comment when GET /comments/:id and return Reviews Array', async () => {
    const mockId = 1;
    const commentRout = APIRoute.Comment.replace(':id', (mockId).toString());

    mockAPI
      .onGet(commentRout)
      .reply(200, [] as Reviews);

    const store = mockStore();

    await store.dispatch(fetchLoadCommentAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchLoadCommentAction.pending.type,
      fetchLoadCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch send comment when POST /comments/:id and return Reviews Array', async () => {
    const mockId = 1;
    const commentRout = APIRoute.Comment.replace(':id', (mockId).toString());
    const sendComment = { id: mockId } as Comment;

    mockAPI
      .onPost(commentRout)
      .reply(200, [] as Reviews);

    const store = mockStore();

    await store.dispatch(fetchSendCommentAction(sendComment));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSendCommentAction.pending.type,
      fetchSendCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch load Nearby Offers when /hotels/:id/nearby and return Offers Array', async () => {
    const mockId = 1;
    const nearbyRout = APIRoute.Nearby.replace(':id', (mockId).toString());
    const response = [{} as Offer];
    mockAPI
      .onGet(nearbyRout)
      .reply(200, response);

    const store = mockStore();

    await store.dispatch(fetchLoadNearbyOfferAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchLoadNearbyOfferAction.pending.type,
      fetchLoadNearbyOfferAction.fulfilled.type,
    ]);
  });

  it('Should dispath load favorite offers when /favorite and return Offers Array', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, [] as Offer[]);

    const store = mockStore();

    await store.dispatch(fetchLoadFavoriteAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchLoadFavoriteAction.pending.type,
      fetchLoadFavoriteAction.fulfilled.type
    ]);
  });

  it('Should dispath change favorite status offer when /favorite/id/boolean and return Offer Object', async () => {
    const favorite: Favorite = {
      id: 1,
      isFavorite: true,
    };
    const favoriteRoute = `${APIRoute.Favorite}/${favorite.id}/${+favorite.isFavorite}`;

    mockAPI
      .onPost(favoriteRoute)
      .reply(200, {} as Offer);

    const store = mockStore();

    await store.dispatch(fetchChangeFavorite(favorite));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchChangeFavorite.pending.type,
      fetchChangeFavorite.fulfilled.type,
    ]);
  });

});
