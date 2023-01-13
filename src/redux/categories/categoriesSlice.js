import { fetchCategories } from './categoriesOperations';

const { createSlice } = require('@reduxjs/toolkit');

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { data: [], isLoading: false, error: null },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { payload }) => ({
      ...state,
      data: payload,
      isLoading: false,
    }),
    [fetchCategories.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchCategories.rejected]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  },
});

export default categoriesSlice.reducer;
