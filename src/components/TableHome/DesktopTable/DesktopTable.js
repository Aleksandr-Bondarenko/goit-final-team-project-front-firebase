import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useSelector } from 'react-redux';

import styles from './DesktopTable.module.scss';

import transactionsSelectors from 'redux/transactionsTable/transactionsTableSelectors';
import categoriesActions from 'redux/categories/categoriesSelectors';

import { sortingTransactionsByDate } from '../../../utilities/sortingFunctions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
    fontSize: 18,
    fontWeight: 700,
    color: '#000000',
    '&:first-of-type': {
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
    },
    '&:last-child': {
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:not(:last-child)': {
    td: {
      borderBottom: 1,
      borderStyle: 'solid',
      borderColor: '#dcdcdf',
    },
  },
}));

const columns = [
  {
    id: 'date',
    label: 'Дата',
    align: 'left',
    pl: 20,
    format: (value) => value.split(',')[0],
  },
  {
    id: 'type',
    label: 'Тип',
    align: 'center',
    format: (value) => (value === 'income' ? '+' : '-'),
  },
  {
    id: 'category',
    label: 'Категорія',
    align: 'left',
  },
  {
    id: 'comment',
    label: 'Коментар',
    align: 'left',
  },
  {
    id: 'sum',
    label: 'Сума',
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'balance',
    label: 'Баланс',
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function DesktopTable() {
  const data = useSelector(transactionsSelectors.getTransactions);
  const isLoading = useSelector(transactionsSelectors.getTransactionsIsLoading);
  const categories = useSelector(categoriesActions.getCategories);

  const sortedData = sortingTransactionsByDate(data);

  const generateBalanceValuesForTransactions = (data) => {
    const initialBalance = 0;
    const balanceValues = [];
    data.reduce((acc, item) => {
      if (item.typeTx === 'income') {
        balanceValues.push(acc + item.sum);
        return acc + item.sum;
      } else {
        balanceValues.push(acc - item.sum);
        return acc - item.sum;
      }
    }, initialBalance);

    return balanceValues;
  };

  const balancesArr = generateBalanceValuesForTransactions(sortedData);

  const rows = sortedData.map(
    ({ id, date, typeTx, categoryId, comment, sum }, idx) => {
      const category = categories.find((el) => el.id === categoryId);

      return {
        id,
        date,
        type: typeTx,
        category: category?.name,
        comment,
        sum,
        balance: balancesArr[idx],
      };
    },
  );

  return (
    <div sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 540, width: 688 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={styles.tableHeaderCell}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <StyledTableRow
                  hover //hover?
                  tabIndex={-1}
                  key={row.id}
                  className={styles.tableRow}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'sum') {
                      return (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          sx={
                            row.type === 'income'
                              ? `color: #24cca7`
                              : `color: #ff6596`
                          }
                        >
                          {column.format ? column.format(value) : value}
                        </StyledTableCell>
                      );
                    }
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <div>Loading...</div>}
      {data.length === 0 && !isLoading && (
        <div className={styles.plug}>
          <p className={styles.plugText}>
            Вітаю! Додай свою першу транзакцію. "
            <span className={styles.plugPlus}>+</span>"
          </p>
        </div>
      )}
    </div>
  );
}
