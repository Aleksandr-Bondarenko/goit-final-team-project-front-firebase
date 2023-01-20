import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { addNewTransaction } from '../../firebase/firestoreApi';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async ({ userId, newTransaction }, { rejectWithValue }) => {
    try {
      addNewTransaction(userId, newTransaction);
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  },
);
