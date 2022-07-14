import Main from '../../pages/main/main';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return <Main placesCount = {placesCount} />;
}

export default App;
