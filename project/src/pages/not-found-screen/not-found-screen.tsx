import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import './not-found-screen.css';

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
        <section className="page__not-found-section">
          <h1>404. Not Found Pages</h1>
          <Link className="page__not-found-link" to="/">Back to index</Link>
        </section>
      </main>
    </div>
  );
}
