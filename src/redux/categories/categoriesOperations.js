import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCollection } from '../../firebase/firestoreApi';
import { sortingCollectionByOrderField } from '../../utilities/sortingFunctions';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCollection('categories');
      const categories = data.docs.map((doc) => {
        return {
          id: doc.id,
          name: Object.values(doc.data())[0],
          order: Object.keys(doc.data())[0],
        };
      });
      sortingCollectionByOrderField(categories);
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
