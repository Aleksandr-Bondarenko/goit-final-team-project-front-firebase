import { fetchBalance } from './balanceOperations';

const { createSlice } = require('@reduxjs/toolkit');

const balanceSlice = createSlice({
  name: 'balance',
  initialState: { value: 0, isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchBalance.fulfilled]: (state, { payload }) => ({
      ...state,
      value: payload.balance,
      isLoading: false,
    }),
    [fetchBalance.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchBalance.rejected]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  },
});

export default balanceSlice.reducer;
