import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaces } from '../api/placesApi';

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async ({ location, category, keyword, source }, { rejectWithValue }) => {
    try {
      const data = await getPlaces(location, category, keyword, source);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    places: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPlaces: (state) => {
      state.places = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload || [];
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener datos';
      });
  },
});

export const { clearPlaces } = placesSlice.actions;

export default placesSlice.reducer;
