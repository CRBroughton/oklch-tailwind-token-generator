import { configureStore } from '@reduxjs/toolkit'
import coloursReducer from './store/colours'

const store = configureStore({
  reducer: {
    colours: coloursReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Store = typeof store
export default store
