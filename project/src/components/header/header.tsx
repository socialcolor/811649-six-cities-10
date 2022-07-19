import Logo from '../logo/logo';
import UserName from '../user-name/user-name';

type HeaderProps = {
  authorizationStatus: string;
}

export default function Header({authorizationStatus}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <UserName authorizationStatus={authorizationStatus}/>
          </nav>
        </div>
      </div>
    </header>
  );
}
