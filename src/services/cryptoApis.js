import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "da48c2da7fmsh6175c03af39fa54p1a7b44jsna817127f2491",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createrequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createrequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createrequest(`/coin/${coinId}`)
    }),

    // Its giving the error as we have not premium pakage
    getExchanges: builder.query({
      query: () => createrequest(`/exchanges`)
    }),
    getCryptoHistory: builder.query({
      query: ({coinId , timeperiod}) => createrequest(`/coin/${coinId}/history/${timeperiod}`)
    })
  }),
});

export const { useGetCryptosQuery , useGetCryptoDetailsQuery , useGetCryptoHistoryQuery , useGetExchangesQuery} = cryptoApi;
