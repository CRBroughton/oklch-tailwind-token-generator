import { configureStore, Middleware } from '@reduxjs/toolkit'
import coloursReducer, { initialColourState } from './colours'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '@/utils/localStorage';

const preloadedColoursState = loadStateFromLocalStorage('coloursState', initialColourState);
if (preloadedColoursState.colours.length === 0) {
  preloadedColoursState.colours = initialColourState.colours
}

export const localStorageMiddleware: Middleware =
  store => next => action => {
    const result = next(action);

    const state = store.getState();
    if (state.coloursReducer) {
      saveStateToLocalStorage('coloursState', state.coloursReducer);
    }

    return result;
  };
const store = configureStore({
  reducer: {
    coloursReducer,
  },
  preloadedState: {
    coloursReducer: preloadedColoursState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Store = typeof store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store
