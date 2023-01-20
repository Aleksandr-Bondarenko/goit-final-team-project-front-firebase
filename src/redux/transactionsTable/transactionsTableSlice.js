import { fetchTransactions } from './transactionsTableOperations';

const { createSlice } = require('@reduxjs/toolkit');

const transactionsSlice = createSlice({
  name: 'transactionsTable',
  initialState: { data: [], isLoading: true, error: null },
  reducers: {
    setNewTransaction: (state, { payload }) => ({
      ...state,
      data: [...state.data, payload],
    }),
  },
  extraReducers: {
    [fetchTransactions.fulfilled]: (state, { payload }) => ({
      ...state,
      data: payload,
      isLoading: false,
    }),
    [fetchTransactions.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchTransactions.rejected]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  },
});

export const { setNewTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
