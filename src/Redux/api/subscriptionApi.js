import { baseApi } from "../baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSubscribers: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/subscriber",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["subscription"],
    }),
    allSubscriptionPlans: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/subscription",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["subscription"],
    }),
    addSubscription: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/subscription",
          method: "post",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subscription"],
    }),
    editSubscription: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("edit api data", data);
        return {
          url: "/api/v1/admin/subscription",
          method: "put",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("delete api data id", id);
        return {
          url: "/api/v1/admin/subscription",
          method: "delete",
          body: id,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useAllSubscribersQuery,
  useAllSubscriptionPlansQuery,
  useAddSubscriptionMutation,
  useEditSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
