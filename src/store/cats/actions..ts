import { createAction } from '@reduxjs/toolkit';
import actionTypes from './actionTypes';

export const fetchCatsAction = createAction<number>(actionTypes.FETCH_CATS);