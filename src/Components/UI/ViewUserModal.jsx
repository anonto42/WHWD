/* eslint-disable react/prop-types */
import { Modal, Typography, Button, Avatar, ConfigProvider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../utils/baseUrl";

const { Text } = Typography;

const imageUrl = getImageUrl();

const ViewUserModal = ({
  isViewCustomer,
  handleCancel,
  currentRecord,
  handleBlock,
  handleUnblock,
  // isBlocking,
}) => {
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
        open={isViewCustomer}
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

        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Avatar */}
            {currentRecord ? (
              <img
                src={
                  currentRecord?.image?.startsWith("https://")
                    ? currentRecord.image
                    : `${imageUrl}${currentRecord?.image}`
                }
                alt={currentRecord?.name}
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
                {currentRecord?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            )}

            <div className="text-wrap">
              <p className="text-lg font-medium text-white">
                {currentRecord?.name || "User"}
              </p>
              {currentRecord?.email && (
                <p className="text-sm text-white">{currentRecord?.email}</p>
              )}
              {currentRecord?.role && (
                <Text style={{ color: "#fff" }}>
                  {currentRecord.role.charAt(0).toUpperCase() +
                    currentRecord.role.slice(1).toLowerCase()}
                </Text>
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
              }}
            >
              {currentRecord?.clientName && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Text style={{ color: "#666" }}>Client Name:</Text>
                  <Text strong>{currentRecord.clientName}</Text>
                </div>
              )}
              {currentRecord?.contact && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Text style={{ color: "#666" }}>Contact:</Text>
                  <Text strong>{currentRecord.contact}</Text>
                </div>
              )}
              {currentRecord?.location && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Text style={{ color: "#666" }}>Contact:</Text>
                  <Text strong>{currentRecord.location}</Text>
                </div>
              )}

              {currentRecord?.subscription && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Text style={{ color: "#666" }}>Subscription:</Text>
                  <Text strong>
                    {currentRecord?.subscription.isSubscriped
                      ? "Subscribed"
                      : "Not Subscribed"}
                  </Text>
                </div>
              )}

              {currentRecord?.status && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                  }}
                >
                  <Text style={{ color: "#666" }}>Status:</Text>
                  <Text
                    strong
                    style={{
                      color:
                        currentRecord.status === "ACTIVE"
                          ? "#52c41a"
                          : currentRecord.status === "BLOCKED"
                          ? "#f5222d"
                          : "#1890ff",
                    }}
                  >
                    {currentRecord.status.charAt(0).toUpperCase() +
                      currentRecord.status.slice(1).toLowerCase()}
                  </Text>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#F5382C",
                borderColor: "#F5382C",
              }}
              // loading={isBlocking}
              onClick={() => {
                if (currentRecord?.status === "ACTIVE") {
                  handleBlock(currentRecord);
                } else if (currentRecord?.status === "BLOCKED") {
                  handleUnblock(currentRecord);
                }
              }}
            >
              {currentRecord?.status === "ACTIVE" ? "Block" : "Unblock"}
            </Button>
            <Button
              type="primary"
              style={{
                background: "linear-gradient( #905E26, #F1CC47)",
              }}
              onClick={handleCancel}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ViewUserModal;
