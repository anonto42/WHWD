/* eslint-disable react/prop-types */
import { Modal, Button, Avatar, ConfigProvider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../utils/baseUrl";
import dayjs from "dayjs";

const imageUrl = getImageUrl();

const ViewSubscriberModal = ({
  isViewSubscriber,
  handleCancel,
  currentRecord,
  // isBlocking,
}) => {
  console.log("isViewSubscriber", isViewSubscriber);
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(36,52,88)",
          },
        },
      }}
    >
      <Modal
        open={isViewSubscriber}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
        closable={false}
        style={{
          backgroundColor: "#243458",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "12px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined className="text-white" />}
            onClick={handleCancel}
            style={{ marginRight: 10 }}
          />
          <p className="text-lg font-medium text-white">User Details</p>
        </div>

        <div className="flex items-center gap-20 p-6">
          <div className="flex items-center">
            {/* Avatar */}
            {currentRecord ? (
              <img
                src={
                  currentRecord?.image?.startsWith("https://")
                    ? currentRecord.image
                    : `${imageUrl}${currentRecord?.userId?.image}`
                }
                alt={currentRecord?.userId?.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "9999px",
                  border: "1px solid #9254de",
                  marginRight: "20px",
                }}
              />
            ) : (
              <Avatar
                size={80}
                style={{
                  backgroundColor: "#9254de",
                  marginRight: "20px",
                }}
              >
                {currentRecord?.userId?.name.charAt(0).toUpperCase() || "U"}
              </Avatar>
            )}

            <div className="text-wrap">
              <p className="text-lg font-medium text-white">
                {currentRecord?.userId?.name || "User"}
              </p>
              {currentRecord?.userId?.email && (
                <p className="text-sm text-white">
                  {currentRecord?.userId?.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-lg font-medium text-white">Package</p>
            <hr className="mb-2" />
            <div className="flex flex-col gap-2 text-white">
              <p>
                <span className="font-semibold">Package:</span>{" "}
                {currentRecord?.subscriptionId?.name}
              </p>
              <div className="flex items-center">
                <p className="font-semibold">Price: </p>{" "}
                <p className="text-lg font-medium">
                  {" "}
                  ${currentRecord?.subscriptionId?.price}
                </p>
                /
                <p className="capitalize">
                  {currentRecord?.subscriptionId?.type}
                </p>
              </div>
              <p>
                {" "}
                <span className="font-semibold">Date: </span>
                {dayjs(currentRecord?.subscriptionId?.updatedAt).format(
                  "DD.MM.YYYY"
                )}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ViewSubscriberModal;
