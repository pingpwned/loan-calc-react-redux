import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/useCalc'
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

interface State {
  amount: number
  term: number
}

export const initialState: State = {
  amount: 400,
  term: 15,
}
export const setAmount = createAction('SET_AMOUNT', function prepare(
  amount: number,
) {
  return {
    payload: {
      amount,
    },
  }
})
export const setTerm = createAction('SET_TERM', function prepare(term: number) {
  return {
    payload: {
      term,
    },
  }
})

const calcReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAmount, (state, action) => {
      state.amount = action.payload.amount
    })
    .addCase(setTerm, (state, action) => {
      state.term = action.payload.term
    })
})

const RootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  calcStore: calcReducer,
})

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddiware) =>
    getDefaultMiddiware().concat(api.middleware),
})

setupListeners(store.dispatch)
