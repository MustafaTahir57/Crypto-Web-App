import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApis";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
  reducer: {
    // Add your RTK-Query API slice reducers under the specified reducerPaths
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    // Add other reducers if any
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware, // Add cryptoApi middleware
      cryptoNewsApi.middleware // Add cryptoNewsApi middleware
    ),
});
