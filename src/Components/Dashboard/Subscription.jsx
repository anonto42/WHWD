import { useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import Subscribers from "./Subscription/Subscribers";
import SubscriptionPlan from "./Subscription/SubscriptionPlan";

const { TabPane } = Tabs;

const Subscription = () => {
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
          <TabPane tab="Subscribers" key="1">
            <Subscribers />
          </TabPane>
          <TabPane tab="Subscription Plan" key="2">
            <SubscriptionPlan />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default Subscription;
