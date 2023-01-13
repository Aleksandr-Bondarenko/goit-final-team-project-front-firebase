import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import getNewTransaction from 'redux/transaction/transactionSelectors';
import { fetchTransactions } from 'redux/transactionsTable/transactionsTableOperations';

export default function TableHome() {
  const dispatch = useDispatch();
  const newTransaction = useSelector(getNewTransaction);

  useEffect(() => {
    // dispatch(fetchTransactions());
  }, [dispatch, newTransaction]);

  return (
    <Media query="(max-width: 768px)">
      {(matches) => (matches ? <MobileTable /> : <DesktopTable />)}
    </Media>
  );
}
