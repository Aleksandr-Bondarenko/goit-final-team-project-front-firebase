import styles from './Currency.module.scss';
import { ReactComponent as Curve } from '../../icons/currencyCurve.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const fixValue = (value) => {
  if (value.indexOf(0) === 0) {
    return '0' + value.slice(0, 4);
  } else {
    return value.slice(0, 5);
  }
};

export default function Currency() {
  const [currencyData, setCurrencyData] = useState(() =>
    JSON.parse(localStorage.getItem('currency')),
  );

  useEffect(() => {
    const lastData = JSON.parse(localStorage.getItem('currency'));
    const lastFetchTime = JSON.parse(localStorage.getItem('fetch time'));

    // if (lastData && Date.now() - lastFetchTime < 1800000) {
    //   setCurrencyData(lastData);
    // } else {
    const instance = axios.create({
      baseURL: '',
      headers: '',
    });
    instance
      .get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .then((r) => {
        const data = r.data.filter((el) => el.ccy !== 'BTC');
        setCurrencyData(data);
        localStorage.setItem('currency', JSON.stringify(data));
        localStorage.setItem('fetch time', JSON.stringify(Date.now()));
      })
      .catch((error) => console.log(error)); // ADD NOTIFICATION
    // }
  }, [setCurrencyData]);

  return (
    <div className={styles.tableWrapper}>
      {currencyData ? (
        <table className={styles.table}>
          <tbody>
            <tr>
              <th className={styles.tableHead}>Валюта</th>
              <th className={styles.tableHead}>Покупка</th>
              <th className={styles.tableHead}>Продажа</th>
            </tr>
            {currencyData.map((el) => (
              <tr className={styles.tableRow} key={el.ccy}>
                <td className={styles.tableData}>{el.ccy}</td>
                <td className={styles.tableData}>{fixValue(el.buy)}</td>
                <td className={styles.tableData}>{fixValue(el.sale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>LOADER...</p> // ADD LOADER
      )}
      <Curve className={styles.curve}></Curve>
    </div>
  );
}
