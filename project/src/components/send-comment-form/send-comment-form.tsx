import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchSendCommentAction } from '../../store/api-actions';

type SendCommentFormProps = {
  offerId: number;
}
export default function SendCommentForm({offerId}: SendCommentFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');
  const dispatch = useAppDispatch();
  const labelTitle: {
    [index: string]: string;
  } = {
    1: 'terribly',
    2: 'badly',
    3: 'not bad',
    4: 'good',
    5: 'perfect',
  };

  useEffect(() => {
    const button:HTMLButtonElement | null = document.querySelector('.reviews__submit');
    if(comment.length >= 50 && rating && button) {
      button.disabled = false;
    }

    return () => {
      if(button) {
        button.disabled = true;
      }
    };
  }, [comment, rating]);

  const onFormSend = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    dispatch(fetchSendCommentAction({
      id: offerId,
      comment: comment,
      rating: Number(rating),
    }));

  };

  return (
    <form className="reviews__form form" action="/#" method="post" onSubmit={onFormSend}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: 5 }, (element, index) => index + 1).reverse().map((element) => (
          <React.Fragment key={element}>
            <input className="form__rating-input visually-hidden" name="rating" value={element} id={`${element}-stars`} type="radio" onChange={({ target }) => setRating(target.value)} checked={element.toString() === rating} />
            <label htmlFor={`${element}-stars`} className="reviews__rating-label form__rating-label" title={labelTitle[element]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        )
        )}
      </div>
      <textarea maxLength={300} className="reviews__textarea form__textarea" id="review" value={comment} name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={({ target }) => setComment(target.value)}>{comment}
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
