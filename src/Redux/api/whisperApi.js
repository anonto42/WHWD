import { baseApi } from "../baseApi";

const whisperApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allWhispers: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: "/api/v1/admin/whisper",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["whisper"],
    }),

    addWhisper: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("whisper update data", data);
        return {
          url: "/api/v1/admin/whisper",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["whisper"],
    }),

    editWhisper: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("whisper update data", data);
        return {
          url: "/api/v1/admin/whisper",
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["whisper"],
    }),
    deleteWhisper: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/api/v1/admin/whisper",
          method: "delete",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["whisper"],
    }),
  }),
});

export const {
  useAllWhispersQuery,
  useAddWhisperMutation,
  useEditWhisperMutation,
  useDeleteWhisperMutation,
} = whisperApi;
