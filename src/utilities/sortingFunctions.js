import { compareAsc } from 'date-fns';

export const sortingCollectionByOrderField = (collection) => {
  collection.sort((a, b) => a.order - b.order);
};

export const sortingTransactionsByDate = (transactions) => {
  const getFormattedDate = (date) =>
    new Date(date.split(',')[0].split('.').reverse().join('-'));

  return [...transactions].sort((a, b) =>
    compareAsc(getFormattedDate(a.date), getFormattedDate(b.date)),
  );
};

// export const getParsedDate = (date) => {
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   const year = date.getFullYear();

//   const parsedDate = [
//     day < 10 ? '0' + day : day,
//     month < 10 ? '0' + month : month,
//     year,
//   ].join('.');

//   return parsedDate;
// };
