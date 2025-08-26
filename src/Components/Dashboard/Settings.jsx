import { useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import ChangePassword from "./Settings/ChangePassword";
// import PrivacyPolicy from "./Settings/PrivacyPolicy";
// import TermsAndCondition from "./Settings/TermsAndCondition";
import Profile from "./Settings/Profile";
import EditProfile from "./Settings/EditProfile";

const { TabPane } = Tabs;

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("1"); // Default tab is "Profile"

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: "rgba(255,255,255,0.88)",
              itemActiveColor: "rgb(241,204,71)",
              itemHoverColor: "rgb(245,236,155)",
              itemSelectedColor: "rgb(241,204,71)",
              inkBarColor: "rgb(250,173,20)",
              colorBorderSecondary: "rgba(245,34,45,0)",
            },
          },
        }}
      >
        <Tabs activeKey={selectedTab} onChange={handleTabChange}>
          <TabPane tab="Profile" key="1">
            <Profile />
          </TabPane>
          <TabPane tab="Edit Profile" key="2">
            <EditProfile />
          </TabPane>
          <TabPane tab="Change Password" key="3">
            <ChangePassword />
          </TabPane>
          {/* <TabPane tab="Privacy Policy" key="4">
            <PrivacyPolicy />
          </TabPane>
          <TabPane tab="Terms And Condition" key="5">
            <TermsAndCondition />
          </TabPane> */}
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default Settings;
