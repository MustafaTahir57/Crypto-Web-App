import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoApi } from "./cryptoApis";

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': 'da48c2da7fmsh6175c03af39fa54p1a7b44jsna817127f2491',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl =  'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk'

const createrequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi", // The name under which the slice will be added to the store
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }), // Configuring the base query with the base URL
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => ({
        url: '', // This will be appended to the base URL
        headers: cryptoNewsHeaders,
      }),
    }),
  }),
});

// export const cryptoNewsApi = createApi({
//   reducerPath: "cryptoNewsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//   endpoints: (builder) => ({
//     getCryptoNews: builder.query({
//       query: ({ count }) => createrequest(`/search?q=`, { count }), // Modify the query function to accept a count parameter
//     }),
//   }),
// });


export const { useGetCryptoNewsQuery } = cryptoNewsApi;
