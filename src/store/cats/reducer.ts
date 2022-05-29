import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatsState } from '../../types';

const initialState: CatsState = {
  cats: [],
  isFavoritePage: false,
  loading: false,
  loadingNextPage: false,
  error: {
    error: false,
    errorMessage: ''
  }
};

export const catsReducer = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    fetchLoading: (state) => ({
      ...state,
      loading: true
    }),
    fetchSuccess: (state, action) => ({
      ...state,
      ...action.payload,
      cats: [...state.cats, ...action.payload.cats],
      loading: false
    }),
    upDateCats: (state, action:PayloadAction<string>) => {
      if(state.cats) {
        const indexSelectedCat = state.cats.findIndex((cat) => cat.id === action.payload);
        state.cats[indexSelectedCat].favorities = !state.cats[indexSelectedCat].favorities;     
      }
    },
    setFavoritesCats:(state, action: PayloadAction<boolean>) => {
      state.isFavoritePage = action.payload;
    },
    fetchNextPage: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loadingNextPage: action.payload
    }),
    fetchError: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: { 
        error: true,
        errorMessage: action.payload
      }
    })
  }
});

export const { 
  fetchSuccess,
  upDateCats, 
  setFavoritesCats, 
  fetchLoading, 
  fetchNextPage,
  fetchError
} = catsReducer.actions;

export default catsReducer.reducer;