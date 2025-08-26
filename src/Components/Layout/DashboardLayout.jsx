import Topbar from "../Shared/Topbar";

import { MdOutlineDashboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { VscBroadcast } from "react-icons/vsc";
import { IoIosGlobe } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import { FaRegChartBar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  // useNavigate,
} from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

import "../../utils/CustomMenu.css";

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate();

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleLogout = () => {
  //   sessionStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");

  //   navigate("/signin", { replace: true });
  // };

  const adminMenuItems = [
    {
      key: "overview",
      icon: <MdOutlineDashboard width={20} color="white" />,
      label: (
        <NavLink
          to="overview"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Overview
        </NavLink>
      ),
    },
    {
      key: "users",
      icon: (
        <FaRegCircleUser
          width={20}
          color="white"
          // style={{
          //   hover: {
          //     color: "#ffffff",
          //   },
          // }}
        />
      ),
      label: (
        <NavLink
          to="users"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          User Management
        </NavLink>
      ),
    },

    {
      key: "language",
      icon: <IoIosGlobe width={20} color="white" />,
      label: (
        <NavLink
          to="language"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Language Management
        </NavLink>
      ),
    },

    {
      key: "sherpas-management",
      icon: <LuCrown width={20} color="white" />,
      label: (
        <NavLink
          to="sherpas-management"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Sherpas Management
        </NavLink>
      ),
    },
    {
      key: "category-management",
      icon: <FaRegChartBar width={20} height={20} color="white" />,
      label: (
        <NavLink
          to="category-management"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Category Management
        </NavLink>
      ),
    },
    {
      key: "whisper-management",
      icon: <IoBookOutline width={20} height={20} color="white" />,
      label: (
        <NavLink
          to="whisper-management"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Whisper Management
        </NavLink>
      ),
    },
    {
      key: "subscription",
      icon: <VscBroadcast width={20} height={20} color="white" />,
      label: (
        <NavLink
          to="subscription"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Subscription
        </NavLink>
      ),
    },
    {
      key: "settings",
      icon: <IoMdSettings width={20} height={20} color="white" />,
      label: (
        <NavLink
          to="settings"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Settings
        </NavLink>
      ),
    },
    // {
    //   key: "logout",
    //   icon: <VscSignOut size={25} color="white" />,
    //   label: (
    //     <div>
    //       <NavLink
    //         style={{
    //           color: "white",
    //           fontWeight: "500",
    //         }}
    //         onClick={handleLogout}
    //         to="/signin"
    //       >
    //         Logout
    //       </NavLink>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="h-screen">
      <Layout className="!relative">
        <Sider
          width={270}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#334161",
            position: "sticky",
            top: 10,
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={120}
              height={120}
              className="mx-auto my-7"
            />
          </Link>

          <ConfigProvider
            theme={{
              token: {
                colorBgBase: "#FFC0D3",
                colorInfo: "#FFC0D3",
              },
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={pathSegment}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingLeft: "6px",
                paddingRight: "6px",
              }}
              className="gradient-menu"
              items={adminMenuItems}
            />
          </ConfigProvider>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#334161",
              // position: "sticky",
              top: 0,
              zIndex: 99999,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="px-6 py-4 bg-[#071b49]">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
