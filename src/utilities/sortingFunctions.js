export const sortingCollectionByOrderField = (collection) => {
  collection.sort((a, b) => a.order - b.order);
};
