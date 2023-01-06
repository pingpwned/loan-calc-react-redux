import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./getApiUrl";

type args = [number, number];

interface CalcData {
  total: string;
  term: string;
  totalCost: number;
  totalRepayableAmount: number;
  monthlyPayment: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  // global configuration for the api
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    calcData: builder.query<CalcData, args>({
      query: (args: args) => `/calc?amount=${args[0]}&term=${args[1]}`,
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 100,
    }),
  }),
});

export const { useCalcDataQuery } = api;
