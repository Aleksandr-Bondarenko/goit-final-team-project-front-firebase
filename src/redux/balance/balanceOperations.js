import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../firebase/firestoreApi';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserInfo(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
