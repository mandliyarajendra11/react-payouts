import { configureStore } from "@reduxjs/toolkit";
import { Payout } from "./Payouts";

const store = configureStore({
  reducer: {
    [Payout.reducerPath]: Payout.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Payout.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
