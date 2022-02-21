import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';

import RegistrationPage from './views/RegistrationPage/RegistrationPage';
import LoginPage from './views/LoginPage/LoginPage';
import DashBoardPage from 'views/DashBoardPage';
import CurrencyPage from 'views/CurrencyPage';

// import Header from 'components/Header';
import ModalAddTransactions from 'components/ModalAddTransactions';
// import modalSelectors from 'redux/isModalOpen/isModalOpenSelectors';
import ButtonAddTransactions from 'components/ButtonAddTransactions';
import { getIsAuth } from 'redux/auth/auth-selectors';

function App() {
  const isModalOpen = useSelector(modalSelectors.getIsModalOpen);
  const isLoggedIn = useSelector(getIsAuth);

  return (
    <div>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={DashBoardPage} />
        <Route path="/currency" component={CurrencyPage} />
      </Switch>
      {isModalOpen && <ModalAddTransactions />}
      {isLoggedIn && <ButtonAddTransactions />}
      <ToastContainer />
    </div>
  );
}

export default App;
