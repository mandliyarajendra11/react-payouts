import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Payout = createApi({
  reducerPath: "Payout",
  baseQuery: fetchBaseQuery({
    baseUrl:
      " https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/",
  }),
  endpoints: (builder) => ({
    GetData: builder.query({
      query: ({ page }) => {
        return {
          url: `payouts?page=${page}`,
          method: "GET",
        };
      },
    }),
    SearchData: builder.query({
      query: ({ username }) => {
        return {
          url: `search?query=${username}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDataQuery, useSearchDataQuery } = Payout;
