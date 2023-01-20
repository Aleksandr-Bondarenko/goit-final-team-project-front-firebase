import styles from './Toggler.module.scss';
import { ReactComponent as AddTransactionsIcon } from 'icons/AddTransactionsIcon.svg';
import { ReactComponent as ExpensesTransactionIcon } from 'icons/ExpensesTransactionsIcon.svg';

const Toggler = ({ selected, toggleSelected }) => {
  const isTransactionPositive = selected === 'income';
  const isTransactionNegative = selected === 'expense';

  return (
    <div
      className={
        isTransactionPositive ? styles.withoutMargins : styles.togglerWrapper
      }
    >
      <p
        className={
          isTransactionPositive ? styles.activeProfit : styles.plainProfit
        }
      >
        Дохід
      </p>
      <div className={styles.container} onClick={toggleSelected}>
        <button
          type="button"
          className={isTransactionPositive ? styles.profit : styles.expenses}
        >
          {isTransactionPositive ? (
            <AddTransactionsIcon />
          ) : (
            <ExpensesTransactionIcon />
          )}
        </button>
      </div>
      <p
        className={
          isTransactionNegative ? styles.activeExpenses : styles.plainExpenses
        }
      >
        Витрата
      </p>
    </div>
  );
};

export default Toggler;
