import { Button, ConfigProvider, Form, Input, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../Redux/api/authApi";

const ChangePassword = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const email = localStorage.getItem("userEmail");
  console.log("email", email);

  const onFinish = async (values) => {
    console.log("password Values", values);
    try {
      const data = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.newPassword,
        email: email,
        oparationType: "CHANGE_PASSWORD",
      };
      console.log("Request payload:", data);

      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        toast.error("Session expired. Please start the reset process again.");
        navigate("/forgot-password");
        return;
      }

      const response = await changePassword(data).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/");
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      toast.error(
        error?.data?.message || "An error occurred while updating the password."
      );
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
    <div className="min-h-[93vh]">
      <div
        className="flex flex-col
       w-[90%] mx-auto bg-[#334161] p-20 items-center"
      >
        <div className="flex flex-col items-center gap-2 w-full lg:w-[30%] mb-8">
          <p className="text-xl font-medium text-[#fff]">Change Password</p>
          {/* <p className="text-sm text-[#fff] text-center">
            Enter The Email Associated with your account and we’ll sent an email
            with code to reset your password{" "}
          </p> */}
        </div>
        <div className="w-full lg:w-[70%]">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorTextPlaceholder: "#aaa",
                  colorText: "#fff",
                },
              },
            }}
          >
            <Form
              onFinish={onFinish}
              layout="vertical"
              className="w-full bg-transparent"
            >
              <Typography.Title level={5} style={{ color: "#fff" }}>
                Old Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your old password!",
                  },
                ]}
                name="currentPassword"
                className="text-white "
              >
                <Input.Password
                  placeholder="Enter Your Old Password"
                  className="py-2 px-3 text-lg !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#fff" }}>
                Create New Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
                name="newPassword"
                className="text-white"
              >
                <Input.Password
                  placeholder="Enter Your New Password"
                  className="py-2 px-3 text-lg !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#fff" }}>
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="reEnterPassword"
                className="text-white"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
              >
                <Input.Password
                  placeholder="Confirm New Password"
                  className="py-2 px-3 text-lg !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full py-6 border !border-[#5A199B] hover:border-[#5A199B] text-xl !text-white bg-gradient-to-r from-[#905E26] via-[#F1CC47] to-[#F5EC9B] hover:!bg-[#F1CC47] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
