import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../UI/Button';

import { logIn } from '../../redux/auth/auth-operations';

import logoMobile from '../../icons/logo-mobile.svg';
import logo from '../../icons/logo.svg';

import { ReactComponent as EmailIcon } from '../../icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../icons/lock.svg';

import style from './LoginForm.module.scss';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неверный адрес электронной почты')
    .required('Обязательно для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен состоять минимум из 6 символов!')
    .max(12, 'Пароль должен состоять максимум из 12 символов!')
    .required('Обязательно для заполнения'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.formWrap}>
        <img src={logoMobile} alt="" className={style.logoMobile} />
        <img src={logo} alt="" className={style.logo} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            const data = {
              email: values.email,
              password: values.password,
            };

            dispatch(logIn(data));
            resetForm({ email: '', password: '' });
          }}
        >
          {({
            values,
            setValues,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.inputWrap}>
                <EmailIcon className={style.icon} />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="E-mail"
                  className={style.input}
                />

                <div className={style.errorMessage}>
                  {errors.email && touched.email && errors.email}
                </div>
              </div>

              <div className={style.inputWrap}>
                <PasswordIcon className={style.icon} />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Пароль"
                  className={style.input}
                />

                <div className={style.errorMessage}>
                  {errors.password && touched.password && errors.password}
                </div>
              </div>

              <Button type="submit" disabled={!dirty || !isValid}>
                ВХІД
              </Button>
            </form>
          )}
        </Formik>

        <Button type="link" path="/signup">
          РЕЄСТРАЦІЯ
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
