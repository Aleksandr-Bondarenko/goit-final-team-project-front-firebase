import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // const categories = await axios.get('/api/categories');
      // return categories.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
