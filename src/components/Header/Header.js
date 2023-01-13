import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { useWindowSize } from '@react-hook/window-size';

import { getUserName, getIsAuth } from '../../redux/auth/auth-selectors';

import { logout } from 'redux/auth/auth-operations';

import styles from './Header.module.scss';

import { ReactComponent as IconWallet } from '../../icons/IconWallet.svg';
import { ReactComponent as IconExit } from '../../icons/exit.svg';

export default function Header() {
  const isAuthUser = useSelector(getIsAuth);
  const userName = useSelector(getUserName);

  const dispatch = useDispatch();

  const [width] = useWindowSize();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/home/main" alt="homepage">
            <div>
              <IconWallet className={styles.logoIcon} />
              <h1 className={styles.logo}>Wallet</h1>
            </div>
          </Link>
          <div className={styles.userStatus}>
            {isAuthUser && (<p>{userName}</p> || <p>Имя</p>)}

            <NavLink
              to="/"
              onClick={() => dispatch(logout())}
              className={styles.headerBtn}
            >
              <IconExit className={styles.exitIcon} />

              {width >= 768 && 'Выход'}
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
