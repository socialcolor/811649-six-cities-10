import { Review as ReviewType } from '../../types/review';
import dayjs from 'dayjs';
import { calcRating } from '../../utils';

type ReviewProps = {
  review: ReviewType;
}
export default function Review({ review }: ReviewProps): JSX.Element {
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">{review.user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{ width: calcRating(review.rating) }}></span>
              <span className="visually-hidden">{review.rating}</span>
            </div>
          </div>
          <p className="reviews__text">{review.comment}</p>
          <time className="reviews__time" dateTime={dayjs(review.date).format('YYYY-MM-DD')}>{dayjs(review.date).format('MMMM YYYY')}</time>
        </div>
      </li>
    </ul>
  );
}
