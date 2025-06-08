import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userSelectors } from '../../services/slices/user';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.userDataSelector);

  return <AppHeaderUI userName={user?.name} />;
};
