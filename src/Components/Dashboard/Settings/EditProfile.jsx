/* eslint-disable no-unused-vars */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useEditProfileMutation,
  useUserProfileQuery,
} from "../../../Redux/api/userApi";
import { getImageUrl } from "../../../utils/baseUrl";

const EditProfile = () => {
  const { data: profileInfo, isLoading, refetch } = useUserProfileQuery();
  const profile = profileInfo?.data;
  const navigate = useNavigate();
  const imageUrl = getImageUrl();

  const [imageFile, setImageFile] = useState(null); // Store the actual file
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const [updateProfile, { isLoading: isUpdating }] = useEditProfileMutation();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (imageFile) {
      formData.append("image", imageFile); // Send the actual image file
    }

    try {
      const response = await updateProfile(formData).unwrap();
      console.log("edit profile response", response);
      if (response.success) {
        toast.success("Profile updated successfully!");
        await refetch();
        navigate("/settings", { state: { updated: true } });
        setImagePreview(response.data.image);
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  // Handle the image upload
  const handleImageUpload = (info) => {
    const file = info.file;

    // Check if the file is an image
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
      return false;
    }

    const imagePreview = URL.createObjectURL(file);
    setImagePreview(imagePreview);
    setImageFile(file);

    return false;
  };

  useEffect(() => {
    if (profile?.image) {
      setImagePreview(profile.image);
    }
  }, [profile]);

  const imageSrc = profile?.image?.startsWith("https://")
    ? profile.image
    : `${imageUrl}${profile?.image}`;

  return (
    <div className="min-h-[90vh] bg-[#334161] flex justify-center items-center">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full bg-transparent"
      >
        <div className=" text-base-color rounded-lg h-full w-full lg:w-[70%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-8">
              <div className="relative">
                <div className="rounded-full w-fit border-2 border-[#5A199B] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="profile_img"
                    className="!h-40 !w-40 object-cover"
                  />
                </div>
                <Form.Item name="image" className="text-white">
                  <Upload
                    maxCount={1}
                    listType="picture"
                    accept="image/*"
                    onChange={handleImageUpload}
                    showUploadList={true}
                    beforeUpload={() => false}
                  >
                    <Button
                      style={{
                        position: "absolute",
                        top: "-20px",
                        left: "130px",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        opacity: 1,
                        height: "36px",
                        width: "36px",
                        borderRadius: "90px",
                        fontSize: "18px",
                      }}
                    >
                      <EditOutlined style={{ color: "#5A199B" }} />
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className="text-5xl font-semibold text-white">
                {profile?.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-5 text-white">
            <div className="w-full p-4">
              <Typography.Title level={5} style={{ color: "#fff" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profile?.email}
                name="email"
                rules={[
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="email"
                  placeholder="Enter your email"
                  readOnly
                  className="p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#fff" }}>
                Name
              </Typography.Title>
              <Form.Item
                initialValue={profile?.name}
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Enter your Name"
                  className="p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                />
              </Form.Item>

              {profile?.address && (
                <>
                  <Typography.Title level={5} style={{ color: "#222222" }}>
                    Address
                  </Typography.Title>
                  <Form.Item initialValue={profile?.address} name="address">
                    <Input
                      suffix={<MdOutlineEdit />}
                      placeholder="Enter your address"
                      className="p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                    />
                  </Form.Item>
                </>
              )}

              {profile?.phoneNumber && (
                <>
                  <Typography.Title level={5} style={{ color: "#fff" }}>
                    Contact number
                  </Typography.Title>
                  <Form.Item
                    initialValue={profile?.phoneNumber}
                    name="phoneNumber"
                  >
                    <Input
                      suffix={<MdOutlineEdit />}
                      placeholder="Enter your Contact number"
                      className="p-3 bg-site-color border !border-[#5A199B] text-[#5A199B] hover:!text-white hover:bg-transparent hover:border-[#ce9dff] focus:bg-transparent focus:border-[#ce9dff]"
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <Button
                  className="w-full py-6 border !border-[#5A199B] hover:border-[#5A199B] text-xl !text-white bg-gradient-to-r from-[#905E26] via-[#F1CC47] to-[#F5EC9B] hover:!bg-[#F1CC47] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                  loading={isUpdating}
                >
                  Save & Change
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
