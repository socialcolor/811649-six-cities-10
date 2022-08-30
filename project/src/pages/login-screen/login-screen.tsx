import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, City } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFormUserError } from '../../store/user-process/selectors';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import './login-screen.css';
import { changeCity } from '../../store/filter-process/filter-process';

type LoginScreenProps = {
  authorizationStatus: string;
}
export default function LoginScreen({ authorizationStatus }: LoginScreenProps): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const text = useAppSelector(getFormUserError());
  const dispatch = useAppDispatch();

  const cities = Object.values(City);
  const cityName = cities[Math.floor(Math.random() * cities.length)].name;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const onHandleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const onClickCity = () => {
    dispatch(changeCity(cityName));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="/#" method="post" onSubmit={onHandleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className={text ? 'login__input form__input login__input--error' : 'login__input form__input'} type="email" name="email" placeholder="Email" required ref={loginRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className={text ? 'login__input form__input login__input--error' : 'login__input form__input'} type="password" name="password" placeholder="Password" required ref={passwordRef} pattern='(?=.*\d)(?=.*[a-z]).{2,}' title='Must contain at least one number and letter, and at least 2 or more characters' />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root} onClick={onClickCity}>
                <span>{cityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
