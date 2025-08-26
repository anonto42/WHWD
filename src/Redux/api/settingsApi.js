import { baseApi } from "../baseApi";

const accessToken = sessionStorage.getItem("accessToken");
console.log(accessToken);

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        // const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/user/policy",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/terms",
          method: "put",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getTermsConditions: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/user/terms",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    updateTermsConditions: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/terms",
          method: "patch",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} = settingsApi;
