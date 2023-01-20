import { isAfter, format } from 'date-fns/esm';
import styles from './MobileTable.module.scss';
import { useSelector } from 'react-redux';
import transactionsSelectors from '../../../redux/transactionsTable/transactionsTableSelectors';
import categoriesActions from 'redux/categories/categoriesSelectors';

export default function MobileTable() {
  const data = useSelector(transactionsSelectors.getTransactionsTable);
  const categories = useSelector(categoriesActions.getCategories);
  const sortedData = [...data].sort((a, b) =>
    isAfter(new Date(a.date), new Date(b.date)) ? -1 : 1,
  );
  return (
    <>
      {sortedData.map(
        ({ _id, date, typeTx, categoryId, comment, sum, balance }) => {
          const category = categories.find((el) => el._id === categoryId);
          return (
            <div
              className={
                typeTx === 'income'
                  ? `${styles.tableWrapper} ${styles.wrapperIncome}`
                  : `${styles.tableWrapper}`
              }
              key={_id}
            >
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Дата</span>
                  <span className={styles.listValue}>
                    {format(new Date(date), 'dd.MM.yy')}
                  </span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Тип</span>
                  <span className={styles.listValue}>
                    {typeTx === 'income' ? '+' : '-'}
                  </span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Категория</span>
                  <span className={styles.listValue}>
                    {category?.nameCategory}
                  </span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Комментарий</span>
                  <span className={styles.listValue}>{comment}</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Сумма</span>
                  <span
                    className={
                      typeTx === 'income'
                        ? `${styles.listValue} ${styles.income}`
                        : `${styles.listValue} ${styles.outcome}`
                    }
                  >
                    {sum.toFixed(2)}
                  </span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listKey}>Баланс</span>
                  <span className={styles.listValue}>{balance.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          );
        },
      )}
      {data.length === 0 && (
        <div className={styles.plug}>
          <p className={styles.plugText}>
            Для того чтобы вести учёт необходимо ввести данные после нажатия
            кнопки "<span className={styles.plugPlus}>+</span>"
          </p>
        </div>
      )}
    </>
  );
}
