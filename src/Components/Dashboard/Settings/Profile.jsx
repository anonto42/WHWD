import { Form, Input, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useUserProfileQuery } from "../../../Redux/api/userApi";
import { getImageUrl } from "../../../utils/baseUrl";

const Profile = () => {
  const { data: profileInfo, isLoading } = useUserProfileQuery();
  const profile = profileInfo?.data;
  console.log("profile", profile);

  const imageUrl = getImageUrl();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    image: "",
  });

  useEffect(() => {
    if (profile) {
      const profileDataApi = profile;
      setProfileData({
        fullName: profileDataApi.name,
        email: profileDataApi.email,
        image: profileDataApi.profile,
        address: profileDataApi.address || "",
        phoneNumber: profileDataApi.phoneNumber || "",
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-[93vh] bg-[#334161] flex justify-center items-center rounded-lg">
      <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8 px-5">
            <img
              className="relative w-40 h-40 rounded-lg"
              src={
                profile?.image?.startsWith("https://")
                  ? profile.image
                  : `${imageUrl}${profile?.image}`
              }
              alt="Profile"
            />
            <p className="text-5xl font-semibold text-white">
              {profileData?.fullName}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-5 text-white">
          <Form layout="vertical" className="w-full p-4 bg-transparent">
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                value={profileData?.email}
                readOnly
                className="cursor-not-allowed p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Full Name
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profileData?.fullName}
                className="cursor-not-allowed p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
              />
            </Form.Item>
            {profileData?.address && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData?.address}
                    className="cursor-not-allowed p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                  />
                </Form.Item>
              </>
            )}
            {profileData?.phoneNumber && (
              <>
                <Typography.Title level={5} style={{ color: "#fff" }}>
                  Contact Number
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData?.phoneNumber}
                    className="cursor-not-allowed py-2 px-3 text-lg bg-site-color border !border-[#5A199B] text-[#5A199B] hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
