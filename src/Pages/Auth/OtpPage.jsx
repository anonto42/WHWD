import { Button, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import {
  // useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../Redux/api/authApi";
import { toast } from "sonner";

import forgotPassBg from "../../../public/images/authImages/otp.png";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [verifyOtp] = useVerifyOtpMutation();
  // const [resendOtp] = useResendOtpMutation();

  const handleOTPSubmit = async () => {
    // navigate("/reset-password");

    if (otp.length < 4) {
      alert("Please fill in all OTP fields");
      return;
    }

    const token = localStorage.getItem("otpToken");
    if (!token) {
      alert("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    try {
      const data = { email, otp };
      console.log("OTP Data:", data);
      const response = await verifyOtp(data).unwrap();
      console.log("OTP verification response:", response);

      if (response.success === true) {
        // localStorage.setItem("verifiedOtpToken", response?.data?.token);
        toast.success("OTP verified successfully!");
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.data?.message === "Invalid OTP") {
        toast.error("Invalid OTP. Please try again.");
      }
      if (error.data.message === "Your otp was wrong!") {
        toast.error("Wrong OTP!");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };

  // const handleResendOtp = async () => {
  //   // const email = localStorage.getItem("userEmail");
  //   // if (!email) {
  //   //   toast.error("Email not found. Please start the reset process again.");
  //   //   navigate("/forgot-password");
  //   //   return;
  //   // }
  //   // const data = { email };
  //   // try {
  //   //   const response = await resendOtp(data).unwrap();
  //   //   if (response.success === true) {
  //   //     toast.success("An OTP has been sent to your email!");
  //   //   }
  //   // } catch (error) {
  //   //   // console.error("Error sending reset code:", error);
  //   //   if (error.data?.message === "User not found") {
  //   //     toast.error("Incorrect Email.");
  //   //   } else {
  //   //     toast.error("Failed to resend OTP. Please try again.");
  //   //   }
  //   // }
  // };

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
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#3d919c77] to-[#1b5da860] z-10">
        <div className="relative z-20 w-full max-w-2xl p-8 rounded-lg shadow-xl bg-[#6f3dc042]">
          <div className="w-full">
            <div className="mb-8">
              {/* <Link to="/forgot-password">
                  <HiArrowLeft className="text-xl md:text-2xl lg:text-3xl" />
                </Link> */}
              <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 text-white text-center">
                Enter the 6-digit code sent your email
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border border-white
                      hover:border-white focus:bg-transparent focus:border-white rounded-lg mr-[10px] sm:mr-[20px] text-[#fff]"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              {/* <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <Link
                  href="/otp-verification"
                  className="!text-[#7624ad] !underline font-semibold"
                  onClick={handleResendOtp}
                >
                  Resend
                </Link>
              </div> */}

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 mt-8 text-xl font-semibold rounded-2xl border-none text-white bg-gradient-to-r from-[#D7A52C] via-[#A020F0] to-[#A020F0]"
                  onClick={handleOTPSubmit}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
