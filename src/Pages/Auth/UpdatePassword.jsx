import { Button, Form, Input, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";
import { useResetPasswordMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";

import updatePassBg from "../../../public/images/authImages/updatePass.png";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    console.log("reset pass values", values);
    try {
      const data = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        email: localStorage.getItem("userEmail"),
        oparationType: "FORGET_PASSWORD",
      };
      console.log("Request payload:", data);

      const token = localStorage.getItem("otpToken");
      if (!token) {
        toast.error("Session expired. Please start the reset process again.");
        navigate("/forgot-password");
        return;
      }

      const response = await resetPassword(data).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      // if (error.response) {
      //   console.error("Validation error details:", error.response.data);
      //   toast.error(
      //     error.response.data.message ||
      //       "Failed to update password. Please try again."
      //   );
      // } else {
      //   toast.error("An unexpected error occurred. Please try again.");
      // }
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen text-base-color relative"
      style={{
        backgroundImage: `url(${updatePassBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center  bg-gradient-to-r from-[#2a548577] to-[#1b5da860] z-10">
        <div className="relative z-20 w-full max-w-xl p-8 rounded-lg shadow-xl bg-[#99c6e44b]">
          <div className="w-full">
            {/* -------- update Password Page Header ------------ */}
            <div className="mb-8">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-center text-white">
                Create a New Password
              </h1>
            </div>
            {/* -------- Form Start ------------ */}
            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={4} style={{ color: "#fff" }}>
                New Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "New Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  prefix={<MdOutlineLock />}
                  placeholder="Enter new password"
                  className="py-2 px-3 text-xl  !border-white text-white !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#fff" }}>
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                className="!text-base-color"
              >
                <Input.Password
                  prefix={<MdOutlineLock />}
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl  !border-white text-white !bg-transparent"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 mt-8 text-xl font-semibold rounded-2xl border-none text-white bg-gradient-to-r from-[#D7A52C] via-[#A020F0] to-[#A020F0]"
                  htmlType="submit"
                >
                  Update password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
