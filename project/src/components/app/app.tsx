import React from 'react';
import IconArrowSelected from '../icon-arrow-select/icon-arrow-select';
import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  placesCount: number;
}

export default function App({ placesCount }: AppScreenProps): JSX.Element {
  return (
    <React.Fragment>
      <IconArrowSelected />
      <MainScreen placesCount={placesCount} />
    </React.Fragment>
  );
}
