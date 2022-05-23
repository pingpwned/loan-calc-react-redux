import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type args = [number, number]

interface CalcData {
  totalPrincipal: string
  term: string
  totalCostOfCredit: number
  totalRepayableAmount: number
  monthlyPayment: number
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer`,
  }),
  // global configuration for the api
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    calcData: builder.query<CalcData, args>({
      query: (args: args) => `?amount=${args[0]}&term=${args[1]}`,
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useCalcDataQuery } = api
