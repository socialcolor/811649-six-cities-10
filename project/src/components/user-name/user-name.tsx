import { AuthorizationStatus } from '../../const';
import Login from '../login/login';
import Logout from '../logout/logout';

type UserNameProps = {
  authorizationStatus: string;
}

export default function UserName({ authorizationStatus }: UserNameProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth ? <Login /> : <Logout />
  );
}
