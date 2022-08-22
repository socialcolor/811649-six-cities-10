import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

type NotFoundScreenProps = {
  authorizationStatus: string;
}

export default function NotFoundScreen({authorizationStatus}: NotFoundScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Header authorizationStatus={authorizationStatus} />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <section style={{textAlign: 'center'}}>
          <h1>404. Not Found Pages</h1>
          <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'underline', color: 'blue', }}>Back to index</Link>
        </section>
      </main>
    </div>
  );
}
