import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import uniqid from 'uniqid';

import { fetchCategories } from 'redux/categories/categoriesOperations';
import categoriesActions from 'redux/categories/categoriesSelectors';
import { getUserId, getUserBalance } from '../../redux/auth/auth-selectors';
import { createTransaction } from 'redux/transaction/transactionOperations';
import modalActions from 'redux/isModalOpen/isModalOpenActions';
import { setNewTransaction } from '../../redux/transactionsTable/transactionsTableSlice';
import { setBalance } from '../../redux/auth/auth-operations';

import styles from './ModalAddTransactions.module.scss';
import 'styles/globalMUI.scss';

import { ReactComponent as CloseModalIcon } from 'icons/CloseModalIcon.svg';
import { ReactComponent as DateRangeIcon } from 'icons/DateRangeIcon.svg';
import { ReactComponent as OpenSelectIcon } from 'icons/OpenSelectIcon.svg';

import { useFormik } from 'formik';
import DateAdapter from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import Toggler from 'components/Toggler';
import CustomNumberFormat from 'components/CustomNumberFormat';
import Button from '../UI/Button';

const transactionCreationSchema = Yup.object().shape({
  typeTx: Yup.string().required(),
  date: Yup.string().required(),
  sum: Yup.string().required(),
  nameCategory: Yup.string().required(),
  comment: Yup.string(),
});

const ModalAddTransactions = () => {
  const [typeTx, setTypeTx] = useState('expense');
  const [date, setDate] = useState(new Date());
  const [sum, setSum] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [nameCategory, setNameCategory] = useState('');
  const [comment, setComment] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const categories = useSelector(categoriesActions.getCategories);
  const userId = useSelector(getUserId);
  const totalBalance = useSelector(getUserBalance);

  const initial = {
    // date: getParsedDate(date),
    date,
    typeTx,
    sum: Number(sum),
    comment,
    nameCategory,
    categoryId,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validationSchema: transactionCreationSchema,
    onSubmit: (values) => {
      const newTransaction = {
        ...values,
        date: date.toLocaleString(),
        id: uniqid(),
      };
      dispatch(createTransaction({ userId, newTransaction }));
      dispatch(setNewTransaction(newTransaction));

      const updatedBalance =
        newTransaction.typeTx === 'income'
          ? totalBalance + newTransaction.sum
          : totalBalance - newTransaction.sum;
      dispatch(setBalance(userId, updatedBalance));
    },
  });

  const locale = ruLocale;
  const mask = '__.__.___';

  const handleToggle = () => {
    if (typeTx === 'expense') {
      setNameCategory('Нерегулярный доход');
      return setTypeTx('income');
    }

    setTypeTx('expense');
  };

  const onCommentChange = (event) => {
    const { value } = event.target;
    setComment(value);

    if (value.toLowerCase() === 'зарплата') {
      setNameCategory('Регулярный доход');
    }
  };

  const onAmountChange = (event) => {
    const { value } = event.target;
    setSum(value);
  };

  const categorySelectHandler = (category) => {
    setNameCategory(category.name);
    setCategoryId(category.id);
    setIsSelectOpen(false);
  };

  return (
    <div className="container">
      <div className={styles.formWrapper}>
        <button
          className={styles.closeModalButton}
          onClick={() => dispatch(modalActions.hide())}
        >
          <CloseModalIcon />
        </button>
        <p className={styles.formCall}>Додати транзакцію</p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Toggler selected={typeTx} toggleSelected={handleToggle} />
          <div className={styles.selectWrapper}>
            <input
              className={
                typeTx === 'expense'
                  ? styles.transactionCategory
                  : styles.hidden
              }
              value={nameCategory ? nameCategory : ''}
              placeholder="Оберіть категорію"
              disabled
            />
            <button
              className={
                typeTx === 'expense' ? styles.openSelectButton : styles.hidden
              }
              type="button"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <OpenSelectIcon />
            </button>
            {isSelectOpen && (
              <div className={styles.selectListWrapper}>
                <ul className={styles.selectList}>
                  {categories &&
                    categories.map((category) => (
                      <li
                        className={styles.selectListItem}
                        key={category.id}
                        onClick={() => categorySelectHandler(category)}
                      >
                        <p className={styles.option}>{category.name}</p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.neighborInputsWrapper}>
            <TextField
              variant="standard"
              label=""
              placeholder="0.00"
              value={sum === null ? '' : sum}
              onChange={onAmountChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: CustomNumberFormat,
                classes: { notchedOutline: styles.noBorder },
                disableUnderline: true,
              }}
            />
            {formik.touched.sum && formik.errors.sum ? (
              <span className={styles.error}>{formik.errors.sum}</span>
            ) : null}
            <LocalizationProvider dateAdapter={DateAdapter} locale={locale}>
              <DatePicker
                components={{ OpenPickerIcon: DateRangeIcon }}
                desktopModeMediaQuery="@media (min-width: 320px)"
                classes={{ notchedOutline: styles.noBorder }}
                mask={mask}
                // minDate={new Date()}
                value={date}
                onChange={(date) => {
                  setDate(date);
                }}
                renderInput={({ inputRef, InputProps, inputProps }) => (
                  <div className={styles.datepickerWrapper}>
                    <input
                      className={styles.datepickerInput}
                      ref={inputRef}
                      {...inputProps}
                    />
                    {InputProps?.endAdornment}
                  </div>
                )}
              />
            </LocalizationProvider>
          </div>
          <textarea
            className={styles.transactionComment}
            value={comment}
            onChange={onCommentChange}
            id="comment"
            name="comment"
            placeholder="Місце для коментаря"
          ></textarea>

          <Button type="submit">ДОДАТИ</Button>
          <Button
            type="button"
            reverse
            onClick={() => dispatch(modalActions.hide())}
          >
            СКАСУВАТИ
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddTransactions;
