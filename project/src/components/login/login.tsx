import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLoadFavoriteAction, logoutAction } from '../../store/api-actions';
import { getUserData } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/favorite-process/selectors';
import { useEffect } from 'react';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoadFavoriteAction());
  }, [dispatch]);

  const user = useAppSelector(getUserData());
  const favorite = useAppSelector(getFavoriteOffers());
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{user && user.email}</span>
          <span className="header__favorite-count">{favorite.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" onClick={() => {
          dispatch(logoutAction());
        }} to={AppRoute.Root}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}
