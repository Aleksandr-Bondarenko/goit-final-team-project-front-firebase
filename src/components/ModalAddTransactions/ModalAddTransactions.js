import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchCategories } from 'redux/categories/categoriesOperations';
import categoriesActions from 'redux/categories/categoriesSelectors';
import { createTransaction } from 'redux/transaction/transactionOperations';
import modalActions from 'redux/isModalOpen/isModalOpenActions';
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

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const parsedDate = [
    day < 10 ? '0' + day : day,
    month < 10 ? '0' + month : month,
    year,
  ].join('.');

  const initial = {
    date: parsedDate,
    typeTx,
    sum: Number(sum),
    comment,
    nameCategory,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector(categoriesActions.getCategories);

  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validationSchema: transactionCreationSchema,
    onSubmit: (values) => {
      dispatch(createTransaction(values));
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

  return (
    <div className="container">
      <div className={styles.formWrapper}>
        <button
          className={styles.closeModalButton}
          onClick={() => dispatch(modalActions.hide())}
        >
          <CloseModalIcon />
        </button>
        <p className={styles.formCall}>Добавить транзакцию</p>
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
              placeholder="Выберите категорию"
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
                        key={category._id}
                        onClick={() => {
                          setNameCategory(category.nameCategory);
                          setIsSelectOpen(false);
                        }}
                      >
                        <p className={styles.option}>{category.nameCategory}</p>
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
                minDate={new Date()}
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
            placeholder="Комментарий"
          ></textarea>
          <Button type="submit">ДОБАВИТЬ</Button>
          <Button
            type="button"
            reverse
            onClick={() => dispatch(modalActions.hide())}
          >
            ОТМЕНА
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddTransactions;
