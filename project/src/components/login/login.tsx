export default function Login(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="/#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          <span className="header__favorite-count">3</span>
        </a>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="/#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}
