import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type args = [number, number]

interface CalcData {
  total: string
  term: string
  totalCost: number
  totalRepayableAmount: number
  monthlyPayment: number
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3002/calc'
        : 'https://loan-calc-example.herokuapp.com/calc',
  }),
  // global configuration for the api
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    calcData: builder.query<CalcData, args>({
      query: (args: args) => `?amount=${args[0]}&term=${args[1]}`,
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 100,
    }),
  }),
})

export const { useCalcDataQuery } = api
