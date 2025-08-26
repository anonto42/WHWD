import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "../utils/baseUrl";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ["user", "profile", "settings", "subscription", "whisper"],
});
