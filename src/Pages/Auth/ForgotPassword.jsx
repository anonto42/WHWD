import { Button, Form, Input, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useState } from "react";
import { useForgetPasswordMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";

import forgotPassBg from "../../../public/images/authImages/forgotPass.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [verificationType, setVerificationType] = useState("FORMAT_PASSWORD");
  const navigate = useNavigate();

  const [forgetPassword] = useForgetPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const handleVerificationTypeChange = (value) => {
  //   console.log("verification Type", value);
  //   setVerificationType(value);
  // };

  const onFinish = async () => {
    const data = {
      email,
      verificationType: "FORMAT_PASSWORD",
    };
    console.log("Success:", data);

    try {
      const response = await forgetPassword(data).unwrap();
      console.log("response token", response);
      if (response.success === true) {
        localStorage.setItem("otpToken", response?.data?.token);
        localStorage.setItem("verificationType", "FORMAT_PASSWORD");
        localStorage.setItem("userEmail", response?.data?.user?.email);
        toast.success("An OTP has been sent to your email!");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
      }
      if (error.data?.message === "User not exist!") {
        toast.error("Incorrect Email.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen text-base-color relative"
      style={{
        backgroundImage: `url(${forgotPassBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#24472c77] to-[#164d2d60] z-10" />
      <div className="relative z-20 w-full max-w-xl p-8 rounded-lg shadow-xl bg-[#6f3dc042]">
        <div className="w-full">
          <div className="mb-8 text-center text-white">
            <div className="flex items-center gap-1 mb-4">
              <Link to="/signin">
                <HiArrowLeft className="text-lg md:text-xl lg:text-2xl" />
              </Link>
              <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-center">
                Forgot Password
              </h1>
            </div>
            <p className="md:text-lg lg:text-xl mb-2">
              Please enter your email address to reset your password
            </p>
          </div>

          <Form
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Typography.Title level={4} style={{ color: "#fff" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
              name="email"
              className="text-base-color"
            >
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="py-2 px-3 text-xl  !border-[#fff] text-white !bg-transparent placeholder:text-[#bbb]"
              />
            </Form.Item>
            {/* <Form.Item
                label="Verification Type"
                name="verificationType"
                className="text-base-color"
                initialValue={verificationType}
                rules={[
                  {
                    required: true,
                    message: "Please select verification type",
                  },
                ]}
              >
                <Select
                  value={verificationType}
                  onChange={handleVerificationTypeChange}
                  className="h-12"
                >
                  <Option value="FORMAT_PASSWORD">Forgot Password</Option>
                  <Option value="CHANGE_PASSWORD">Change Password</Option>
                </Select>
              </Form.Item> */}
            <Form.Item>
              <Button
                className="w-full py-6 mt-8 text-xl font-semibold rounded-2xl border-none text-white bg-gradient-to-r from-[#D7A52C] via-[#A020F0] to-[#A020F0]"
                htmlType="submit"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
