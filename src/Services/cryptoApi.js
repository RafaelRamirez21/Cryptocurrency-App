import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'a90922713bmshba206780c5c808ap141d69jsn1a63d2f513aa'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const baseUrlHistory = 'https://api.coinranking.com/v2/'
const createRequest = (url) => ({ url, headers: cryptoApiHeaders })
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges')
    }),
    getCryptoHistories: builder.query({

      query: ({ id, timeperiod }) => createRequest(`/coin/${id}/history/${timeperiod}`),
    })
  })
});
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoriesQuery,
  useGetExchangesQuery,
} = cryptoApi;

