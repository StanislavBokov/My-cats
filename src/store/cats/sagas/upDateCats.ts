/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeLatest, put } from 'typed-redux-saga';
import actionTypes from '../actionTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { fetchCatsAction } from '../actions.';
import { fetchSuccess, fetchLoading, fetchNextPage, fetchError } from '../reducer';



export function* fetchCatsWorker({ payload: currentPage }: ReturnType<typeof fetchCatsAction>)  {
  
  try {    
    axios.defaults.headers.common['x-api-key'] = '5c83da19-11e1-46d4-9b69-2869a58dffe6';
    
    if(currentPage === 1) {
      yield put(fetchLoading());
    }
   
    const cat:AxiosResponse = yield axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:20, size:"full", page: currentPage }});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const catsWithFavoritiesField = cat.data.map((c:any) => {
      return {...c, favorities: false};
    });
 
    yield put(fetchSuccess({ cats: catsWithFavoritiesField }));
    yield put(fetchNextPage(false));
      
  } catch (err) {
    if(err instanceof AxiosError) {
      yield put(fetchError(err.message));
    }
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.FETCH_CATS, fetchCatsWorker);
}
