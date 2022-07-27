import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import UserName from '../user-name/user-name';

type HeaderProps = {
  authorizationStatus: string;
}

export default function Header({ authorizationStatus }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <UserName authorizationStatus={authorizationStatus} />
          </nav>
        </div>
      </div>
    </header>
  );
}
