import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTransactions } from '../../firebase/firestoreApi';

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (userId, { rejectWithValue }) => {
    try {
      return await getAllTransactions(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
