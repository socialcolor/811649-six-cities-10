import { address, image, lorem, datatype, commerce, name, internet, date as fakerDate } from 'faker';
import { Offer } from './types/offer';
import { City } from './const';
import { UserData } from './types/user-data';
import { Review } from './types/review';

export const makeFakerOffer = (): Offer => ({
  city: City.Paris,
  previewImage: image.city(260, 200),
  images: [image.city(260, 200)],
  title: lorem.word(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ max: 5, min: 1, }),
  type: lorem.word(),
  bedrooms: datatype.number(2),
  maxAdults: datatype.number(2),
  price: Number(commerce.price()),
  goods: new Array(4).fill(null).map(() => lorem.word()),
  host: {
    id: datatype.number(99),
    name: name.firstName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  description: lorem.sentence(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({ max: 13, min: 10, }),
  },
  id: datatype.number(99),
});

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(99),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: 'token',
});

export const makeFakeReview = (): Review => ({
  id: datatype.number(99),
  user: {
    id: datatype.number(99),
    name: name.firstName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  rating: datatype.number({ max: 5, min: 1, }),
  comment: lorem.sentence(),
  date: fakerDate.past().toString(),
});
