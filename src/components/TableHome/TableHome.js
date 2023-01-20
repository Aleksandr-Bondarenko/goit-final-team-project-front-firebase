import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { getUserId } from '../../redux/auth/auth-selectors';
import { fetchTransactions } from 'redux/transactionsTable/transactionsTableOperations';

export default function TableHome() {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    dispatch(fetchTransactions(userId));
  }, [dispatch, userId]);

  return (
    <Media query="(max-width: 768px)">
      {(matches) => (matches ? <MobileTable /> : <DesktopTable />)}
    </Media>
  );
}
