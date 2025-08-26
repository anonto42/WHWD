/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { useState } from "react";
import dayjs from "dayjs";

const SubscriberTable = ({
  data,
  loading,
  showSubscriberViewModal,
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      render: (userId) => (
        <div className="">
          <span className="text-lg">{userId?.name}</span>
        </div>
      ),
    },
    {
      title: "Package",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      align: "center",
      render: (subscriptionId) => (
        <div className="">
          <span className="text-lg capitalize">{subscriptionId?.type}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      align: "center",
      render: (subscriptionId) => (
        <div className="">
          <span className="text-lg">{subscriptionId?.price}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <>
          {record.status === "BLOCKED" ? (
            <span className="bg-[#DE2424] text-white py-2 px-3 rounded-xl font-medium text-sm">
              Blocked
            </span>
          ) : (
            <span className="bg-[#02C33C] text-white py-2 px-3 rounded-xl font-medium text-sm">
              Active
            </span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                style={{
                  background: "#FCB917",
                  border: "none",
                  color: "#fff",
                }}
                onClick={() => showSubscriberViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "linear-gradient(#F5EC9B, #F1CC47, #905E26)",
              headerColor: "#151D4A",
              fontSize: 16,
              footerColor: "#FE5C8E",
              colorPrimary: "#FFF9FD",
              colorLinkActive: "#FCC1BE",
              headerSplitColor: "#efe8f5",
              padding: 11,
              colorBgContainer: "#334161",
              colorText: "#fff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            total: data?.length || 0, // Adjust based on data length
            current: currentPage,
            pageSize,
            onChange: (page) => setCurrentPage(page), // Update current page on pagination change
          }}
          rowKey="id"
          scroll={{ x: true }}
          size="large"
        />
      </ConfigProvider>
    </div>
  );
};

export default SubscriberTable;
