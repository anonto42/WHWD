/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  Grid,
  Menu,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfileQuery } from "../../Redux/api/userApi";
import { BellOutlined } from "@ant-design/icons";
import { FaRegBell } from "react-icons/fa6";
import { getImageUrl } from "../../utils/baseUrl";

const notifications = [
  {
    id: 1,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 2,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 3,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 4,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 5,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
];

const { useBreakpoint } = Grid;

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data: profile, isLoading } = useUserProfileQuery();
  const profileData = profile?.data;
  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const screens = useBreakpoint();
  const imageUrl = getImageUrl();

  useEffect(() => {
    if (screens.lg || screens.xl) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [screens, setCollapsed]);

  const handleMenuClick = () => {
    setNotificationCount(0);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/sign-in");
    closeDropdown(); // Close the dropdown when logging out
  };

  const notificationMenu = (
    <div
      onClick={handleMenuClick}
      className="w-80 p-4 bg-[#99a5c2] rounded-lg shadow-md"
    >
      <div className="relative mt-2">
        <h2 className="text-2xl font-semibold text-center text-[#5A199B]">
          Notification
        </h2>
        <Button
          onClick={closeDropdown}
          className="absolute -mt-5 bg-transparent border-none outline-none cursor-pointer right-1 text-end size-3"
        >
          X
        </Button>
      </div>
      <p className="border-b-[1px] border-[#5A199B] py-2 mb-2"></p>
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-center gap-2 py-3 ">
          <FaRegBell className="bg-gradient-to-r from-[#D7A52C] to-[#A020F0] text-white text-3xl p-1 rounded-md" />
          <div className="flex flex-col items-start justify-center">
            <p className="font-medium">{notification.message}</p>
            <p className="text-sm text-white">{notification.time}</p>
          </div>
        </div>
      ))}
      <div className="mt-4 text-center">
        <Link
          to="/notifications"
          className="bg-gradient-to-r from-[#D7A52C] to-[#A020F0] text-white hover:text-gray-200 px-4 py-2 rounded inline-block"
        >
          See More
        </Link>
      </div>
    </div>
  );

  const profileMenu = (
    <Menu
      style={{
        background: "linear-gradient(to right, #905E26, #F1CC47)",
        color: "#fff",
        fontWeight: "600",
      }}
    >
      <Menu.Item key="1"></Menu.Item>
      <Menu.Item key="2" onClick={handleLogout} style={{ color: "#fff" }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading Terms Of Service..." />
      </div>
    );
  }

  return (
    <div className="py-2 mx-[-50px] flex justify-end items-center bg-[#334161] rounded-lg z-50">
      <div className="flex items-center justify-end gap-3 mr-5">
        {/* Notification */}
        {/* <div className="border bg-[#f4e8ff] rounded-full px-2 py-2 h-9 flex cursor-pointer">
          <ConfigProvider
            theme={{ components: { Badge: { colorError: "#DE2424" } } }}
          >
            <Dropdown
              overlay={notificationMenu}
              trigger={["click"]}
              placement="bottomRight"
              onOpenChange={handleDropdownVisibleChange}
              open={isDropdownVisible}
              style={{ zIndex: 9999 }} // Ensure this is above other elements
            >
              <Badge count={notificationCount} size="small">
                <BellOutlined
                  shape="circle"
                  size="small"
                  className="text-lg font-bold text-[#071B49]"
                />
              </Badge>
            </Dropdown>
          </ConfigProvider>
        </div> */}

        {/* Profile button */}
        <Dropdown
          overlay={profileMenu}
          trigger={["click"]}
          style={{ zIndex: 9999 }}
        >
          <div className="flex items-center justify-center gap-2 mr-5 text-center bg-transparent cursor-pointer">
            <img
              src={
                profileData?.image?.startsWith("https://")
                  ? profileData.image
                  : `${imageUrl}${profileData?.image}`
              }
              alt="Profile"
              className="size-10"
            />
            <div className="flex flex-col items-start">
              <p className="text-[#fff] font-medium text-base">
                {profileData?.name}
              </p>
              <p className="text-[#fff] text-xs">{profileData?.role}</p>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
