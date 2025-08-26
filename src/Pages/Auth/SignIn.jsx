import {
  Checkbox,
  Button,
  Input,
  Form,
  Typography,
  ConfigProvider,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { useSignInMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";

import logInBg from "../../../public/images/authImages/logIn.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [login] = useSignInMutation();

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    console.log("Sign In", data);

    try {
      const res = await login(data).unwrap();
      console.log("login response", res);
      if (res.success) {
        sessionStorage.setItem("accessToken", res?.data?.accessToken);
        toast.success("Login Successful!");
        navigate("/");
      } else {
        toast.error("Login Error");
      }
    } catch (error) {
      console.log(error);
      if (error.data?.message === "Password is incorrect!") {
        toast.error("Wrong Password! Please type the correct one.");
      }
      if (error.data?.message === "User doesn't exist!") {
        toast.error("Wrong User Email! Please type the correct one.");
      }
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen text-base-color"
      style={{
        backgroundImage: `url(${logInBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#24472c77] to-[#164d2d60] z-10" />

      <div className="relative z-20 w-full max-w-xl p-8 rounded-lg shadow-xl border border-[#d8e7e5] bg-[#344661]/50">
        <div className="mb-8">
          <img src={AllImages.logo} alt="logo" className="h-40 mx-auto" />
        </div>

        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "#ccc",
              },
            },
          }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Typography.Title level={4} style={{ color: "#fff" }}>
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is Required" }]}
            >
              <Input
                prefix={<HiOutlineMailOpen />}
                placeholder="Enter your email"
                className="px-3 py-2 text-xl bg-transparent hover:bg-transparent text-[#ccc] active:bg-transparent focus:bg-transparent"
                aria-label="Email"
                style={{}}
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#fff" }}>
              Password
            </Typography.Title>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is Required" }]}
            >
              <Input.Password
                prefix={<MdOutlineLock />}
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-transparent hover:bg-transparent text-[#ccc] active:bg-transparent focus:!bg-transparent"
                aria-label="Password"
              />
            </Form.Item>

            <div className="flex items-center justify-between mt-5">
              <Checkbox
                style={{
                  color: "white",
                }}
              >
                Remember me
              </Checkbox>
              <Link to="/forgot-password" className="text-[#fff] underline">
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full py-6 mt-8 text-xl font-semibold rounded-2xl border-none text-white bg-gradient-to-r from-[#D7A52C] via-[#A020F0] to-[#A020F0]"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SignIn;
