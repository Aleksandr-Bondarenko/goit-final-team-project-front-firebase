import { useSelector } from 'react-redux';

import { getUserBalance } from '../../redux/auth/auth-selectors';
import { getIsLoadingUserInfo } from '../../redux/auth/auth-selectors';

import styles from './Balance.module.scss';

export default function Balance() {
  const balance = useSelector(getUserBalance);
  const isLoading = useSelector(getIsLoadingUserInfo);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Ваш баланс</p>
      {isLoading ? (
        <p className={styles.balance}>Loading...</p>
      ) : (
        <p className={styles.balance}>
          ₴ <span className={styles.balanceNumber}>{balance.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
}
