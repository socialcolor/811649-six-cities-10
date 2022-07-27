import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Login(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="/#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}
