import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { LinearProgress } from '@mui/material';

import Button from '../UI/Button';

import styles from './RegistrationForm.module.scss';

import { ReactComponent as IconWallet } from '../../icons/IconWallet.svg';
import { ReactComponent as IconEmail } from '../../icons/IconEmail.svg';
import { ReactComponent as IconPass } from '../../icons/IconPass.svg';
import { ReactComponent as IconName } from '../../icons/IconName.svg';

import { register } from '../../redux/auth/auth-operations.js';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .min(1, 'Имя должно состоять минимум из 1 символа')
      .max(12, 'Имя должно состоять максимум из 12 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно для заполнения'),

    password: yup
      .string()
      .min(6, 'Пароль должен состоять минимум из 6 символов')
      .max(14, 'Пароль должен состоять максимум из 12 символов')
      .typeError('Должно быть строкой')
      .required('Обязательно для заполнения'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Обязательно для заполнения'),

    email: yup
      .string()
      .email('Введите верный email')
      .required('Обязательно для заполнения'),
  });

  const handleRegister = async ({ name, email, password }) => {
    const isRegister = await dispatch(register({ email, password, name }));
    !!isRegister && history.push('/');
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        validateOnBlur
        onSubmit={handleRegister}
        validationSchema={validationsSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <Form className={styles.formRegister}>
            <div className={styles.logoContainer}>
              <IconWallet className={styles.logoIogoIcon} />
              <h1 className={styles.logo}>Wallet</h1>
            </div>

            <div htmlFor={`email`} className={styles.label}>
              <IconEmail />
              <input
                autoComplete="on"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="E-mail"
                value={values.email}
                id="email"
                className={styles.input}
              />

              {touched.email && errors.email && (
                <p className={styles.errors}>{errors.email}</p>
              )}
            </div>
            <div className={styles.label}>
              <IconPass />
              <input
                autoComplete="new-password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" Пароль"
                value={values.password}
                className={styles.input}
                onInput={(e) => setPassword(e.target.value)}
              />

              <LinearProgress
                className={styles.progressBar}
                variant="determinate"
                value={((password.length >= 6 ? 6 : password.length) / 6) * 100}
                sx={{
                  position: 'absolute',
                  backgroundColor: '#E5F1EF',
                  opacity: password ? '1' : '0',
                  '& .MuiLinearProgress-barColorPrimary': {
                    backgroundColor: '#24CCA7',
                    boxShadow: '0px 1px 8px rgba(36, 204, 167, 0.5)',
                  },
                }}
              />

              {touched.password && errors.password && (
                <p className={styles.errors}>{errors.password}</p>
              )}
            </div>
            <div className={styles.label}>
              <IconPass />
              <input
                autoComplete="off"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder=" Подтвердите пароль"
                className={styles.input}
              />

              <LinearProgress
                className={styles.progressBar}
                variant="determinate"
                value={
                  ((values.confirmPassword.length >= values.password.length
                    ? values.password.length
                    : values.confirmPassword.length) /
                    (values.password.length || 6)) *
                  100
                }
                sx={{
                  position: 'absolute',
                  backgroundColor: '#E5F1EF',
                  opacity: values.confirmPassword ? '1' : '0',
                  '& .MuiLinearProgress-barColorPrimary': {
                    backgroundColor:
                      values.confirmPassword === values.password
                        ? '#24CCA7'
                        : '#f44336',
                    boxShadow: '0px 1px 8px rgba(36, 204, 167, 0.5)',
                  },
                }}
              />

              {touched.confirmPassword && errors.confirmPassword && (
                <p className={styles.errors}>{errors.confirmPassword}</p>
              )}
            </div>
            <div className={styles.label}>
              <IconName />
              <input
                autoComplete="on"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Ваше имя"
                className={styles.input}
              />

              {touched.name && errors.name && (
                <p className={styles.errors}>{errors.name}</p>
              )}
            </div>
            <div className={styles.btnContainer}>
              <Button disabled={!isValid && !dirty} type="submit">
                РЕЄСТРАЦІЯ
              </Button>

              <Button type="link" path="/">
                ВХІД
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
