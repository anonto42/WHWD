/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Modal } from "antd";

const DeleteUserModal = ({
  isDeleteModalVisible,
  handleDelete,
  handleCancel,
  currentRecord,
  isDeleting,
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
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
        style={{ textAlign: "center" }}
        // styles.body={{ textAlign: "center" }}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <Button
              className="text-xl py-5 px-8 !text-base-color"
              type="primary"
              onClick={handleCancel}
              style={{
                marginRight: 12,
                background: "rgba(221, 221, 221, 1)",
              }}
            >
              Cancel
            </Button>
            <Button
              className="px-8 py-5 text-xl"
              type="primary"
              style={{
                background: "linear-gradient( #905E26, #F1CC47)",
              }}
              onClick={() => handleDelete(currentRecord)}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="pt-10 pb-4 text-3xl font-semibold text-white">
          Do you want to delete this user?
        </p>
      </Modal>
    </ConfigProvider>
  );
};

export default DeleteUserModal;
