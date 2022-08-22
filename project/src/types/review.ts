import {Host} from './offer';

type Review = {
  id: number;
  user: Host;
  rating: number;
  comment: string;
  date: string;
}

type Comment = {
  id: number,
  comment: string,
  rating: number,
}
export type Reviews = Review[];

export type {Review, Comment};
