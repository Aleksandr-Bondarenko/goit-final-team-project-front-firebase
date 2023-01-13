import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBalance } from 'redux/balance/balanceOperations';
import getBalance from 'redux/balance/balanceSelectors';
import { getUserBalance } from '../../redux/auth/auth-selectors';
import getNewTransaction from 'redux/transaction/transactionSelectors';
import styles from './Balance.module.scss';

export default function Balance() {
  const dispatch = useDispatch();
  // const balance = useSelector(getBalance);
  const balance = useSelector(getUserBalance);
  const newTransaction = useSelector(getNewTransaction);

  useEffect(() => {
    // dispatch(fetchBalance());
  }, [dispatch, newTransaction]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Ваш баланс</p>
      <p className={styles.balance}>
        ₴ <span className={styles.balanceNumber}>{balance.toFixed(2)}</span>
      </p>
    </div>
  );
}
