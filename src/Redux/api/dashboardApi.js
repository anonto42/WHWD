import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/overview",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),

    incomeByYear: builder.query({
      query: (year) => ({
        url: `/users/all-users-rasio?year=${year}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),

    incomeByDays: builder.query({
      query: (days) => ({
        url: `/payment/all-income-rasio-by-days?days=${days}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),

    incomeByHour: builder.query({
      query: (hour) => ({
        url: `/payment/all-income-rasio-by-days?days=${hour}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useIncomeByYearQuery,
  useIncomeByDaysQuery,
  useIncomeByHourQuery,
} = dashboardApi;
