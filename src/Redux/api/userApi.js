import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }

        return {
          url: "/api/v1/admin/users",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    blockUser: builder.mutation({
      query: ({ id }) => {
        console.log("id to block", id);
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: `/api/v1/admin/users?id=${id}`,
          method: "patch",
          headers: {
            // "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Users"],
    }),

    unblockUser: builder.mutation({
      query: ({ id }) => {
        console.log("id to block", id);
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: `/api/v1/admin/users?id=${id}`,
          method: "put",
          headers: {
            // "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => {
        console.log("id to delete", id);
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: `/api/v1/admin/users?id=${id}`,
          method: "delete",
          headers: {
            // "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Users"],
    }),

    userProfile: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }

        return {
          url: "/api/v1/user/profile",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: (formData) => {
        console.log(formData);
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/api/v1/user/profile",
          method: "put",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useUserProfileQuery,
  useEditProfileMutation,
} = userApi;
