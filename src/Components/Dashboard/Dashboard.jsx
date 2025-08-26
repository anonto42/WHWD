/* eslint-disable no-unused-vars */
import { ConfigProvider, Select } from "antd";
import { Link } from "react-router-dom";

import { useState } from "react";
// import { useAllCustomerQuery } from "../../Redux/api/dashboardApi";
import { useDashboardOverviewQuery } from "../../Redux/api/dashboardApi";

import { FaRegUser } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";

import { AiOutlineDollar } from "react-icons/ai";
import { BiLineChart } from "react-icons/bi";
import RevenueBarChart from "../Chart/RevenueBarChart";
import UserGrowthAreaChart from "../Chart/UserGrowthChart";

const Dashboard = () => {
  const {
    data: dashboardOverview,
    isLoading: loadingOverview,
    isError: overviewError,
  } = useDashboardOverviewQuery();
  // console.log("dashboardOverview", dashboardOverview);
  const overviewData = dashboardOverview?.data;
  console.log("overviewData", overviewData);
  // const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedHour, setSelectedHour] = useState("24hour");
  const [selectedDays, setSelectedDays] = useState("7day");

  // const userData = allUsers?.data;
  // console.log(userData);

  // console.log(allCustomer?.data);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, userName: data?.userName });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };

  if (loadingOverview) {
    return <p>Loading...</p>;
  }
  if (overviewError) {
    return <p>Error</p>;
  }

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2 mt-5">
      <div>
        <div>
          {/* Card Items */}
          <div className="grid w-full gap-5 lg:grid-cols-4">
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#334161] py-2 px-1 lg:p-3 items-center flex-1 h-36 w-full">
              <div className="flex items-center w-full h-full gap-4 py-5">
                <div className="p-2 w-fit bg-[#FCB917] to-[#A020F0] rounded-full">
                  <FaRegUser className="text-3xl text-[#fff]" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-lg font-medium text-[#fff]">
                    Total Users
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-bold text-[#fff]">
                    {overviewData?.totalUsers}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap rounded-lg bg-[#334161] py-2 px-1 lg:p-3 items-center flex-1 h-36 w-full">
              <div className="flex items-center w-full h-full gap-4 py-5">
                <div className="p-2 w-fit bg-[#FCB917] rounded-full">
                  <MdAudiotrack className="text-3xl text-[#fff]" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-lg font-medium text-[#fff]">
                    Total Audio
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-bold text-[#fff]">
                    {overviewData?.totalAudios}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap rounded-lg bg-[#334161] py-2 px-1 lg:p-3 items-center flex-1 h-36 w-full">
              <div className="flex items-center w-full h-full gap-4 py-5">
                <div className="p-2 w-fit bg-[#FCB917] rounded-full">
                  <AiOutlineDollar className="text-3xl text-[#fff]" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-lg font-medium text-[#fff] mb-1">
                    Total Revenue
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-bold text-[#fff]">
                    ${overviewData?.totalRevenue}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap rounded-lg bg-[#334161] py-2 px-1 lg:p-3 items-center flex-1 h-36 w-full">
              <div className="flex items-center w-full h-full gap-5 py-5">
                <div className="p-2 w-fit bg-[#FCB917] rounded-full">
                  <BiLineChart className="text-3xl text-[#fff]" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-lg font-medium text-[#fff] mb-1 w-full">
                    Total Downloads
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-bold text-[#fff]">
                    {overviewData?.totalSubscriptions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full p-3 bg-[#334161] rounded-lg mt-8">
            <div className="flex justify-between px-10 my-2 text-base-color">
              <p className="text-2xl sm:text-2xl font-semibold text-[#fff]">
                Total Revenue
              </p>

              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        fontSize: 16,
                        colorBorder: "#222222",
                        colorBgElevated: "rgb(239,232,245)",
                        optionSelectedBg: "rgb(90,25,155)",
                        optionSelectedColor: "rgb(255,255,255)",
                        optionActiveBg: "rgb(200,145,255)",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue="2025"
                    onChange={(value) => setSelectedYear(value)}
                    options={overviewData?.subscriptionsByMonth.map((data) => ({
                      label: data.year.toString(),
                      value: data.year.toString(),
                    }))}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div>
              <RevenueBarChart
                selectedYear={selectedYear}
                overviewData={overviewData}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full p-3 bg-[#334161] rounded-lg mt-8">
            <div className="flex justify-between px-10 my-2 text-base-color">
              <p className="text-2xl sm:text-2xl mb-5 font-semibold text-[#E6E6E6]">
                User Growth
              </p>
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        fontSize: 16,
                        colorBorder: "#222222",
                        colorBgElevated: "rgb(239,232,245)",
                        optionSelectedBg: "rgb(90,25,155)",
                        optionSelectedColor: "rgb(255,255,255)",
                        optionActiveBg: "rgb(200,145,255)",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue="2025"
                    onChange={(value) => setSelectedYear(value)}
                    options={overviewData?.userGrowthByMonth.map((data) => ({
                      label: data.year.toString(),
                      value: data.year.toString(),
                    }))}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div>
              <UserGrowthAreaChart
                selectedYear={selectedYear}
                overviewData={overviewData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
