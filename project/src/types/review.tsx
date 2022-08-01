import {Host} from './hotel';

type Review = {
  id: number;
  user: Host;
  rating: number;
  comment: string;
  date: string;
}
export type Reviews = Review[];

export type {Review};
