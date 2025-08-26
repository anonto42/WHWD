import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),

    // Forget password
    ForgetPassword: builder.mutation({
      query: (data) => {
        // const token = localStorage.getItem("accessToken");
        // console.log("Forget Pass Mail Token", token);
        return {
          url: "/api/v1/auth/send-otp",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Verify Otp
    VerifyOtp: builder.mutation({
      query: (data) => {
        console.log("api data", data);
        const token = localStorage.getItem("otpToken");
        console.log("vetifyOtpToken", token);
        return {
          url: "/api/v1/auth/verify-otp",
          method: "post",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Resend Otp
    ResendOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("Resend OTP Token", token);
        return {
          url: "/otp/resend-otp",
          method: "PATCH",
          body: data,
          headers: {
            // "content-type": "application/json",
            token: token,
          },
        };
      },
    }),

    // Reset Password
    ResetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log({ token });
        return {
          url: "/api/v1/auth/change-password",
          method: "post",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    ChangePassword: builder.mutation({
      query: (data) => {
        const token = sessionStorage.getItem("accessToken");
        console.log({ token });
        return {
          url: "/api/v1/auth/change-password",
          method: "post",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignInMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
