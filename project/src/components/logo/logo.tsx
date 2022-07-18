import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type LogoProps = {
  isLogoActive?: boolean;
}

export default function Logo(isLogoActive: LogoProps) {
  return (
    <Link className={isLogoActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link'} to={AppRoute.Root}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}
