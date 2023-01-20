const getTransactions = (state) => state.transactionsTable.data;

const getTransactionsIsLoading = (state) => state.transactionsTable.isLoading;

const transactionsSelectors = {
  getTransactions,
  getTransactionsIsLoading,
};

export default transactionsSelectors;
