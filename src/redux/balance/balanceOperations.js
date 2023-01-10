import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      // const balance = await axios.get('/api/users/current');
      // return balance.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
