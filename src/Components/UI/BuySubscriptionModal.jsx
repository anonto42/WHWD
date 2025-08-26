/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Card,
  Input,
  Spin,
  Select,
  ConfigProvider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import {
  useAddSubscriptionMutation,
  useAllSubscriptionsQuery,
  useEditSubscriptionMutation,
} from "../../Redux/api/subscriptionApi";
import { toast } from "sonner";

const { Title } = Typography;

const BuySubscriptionModal = ({ visible, onCancel }) => {
  const {
    data: subscriptionPackages,
    isLoading,
    refetch,
  } = useAllSubscriptionsQuery();
  const packageData = subscriptionPackages?.data;
  console.log("packageData", packageData);

  const [addSubscription, { isLoading: isAdding, error: addError }] =
    useAddSubscriptionMutation();
  const [editSubscription, { isLoading: isEditing, error: editError }] =
    useEditSubscriptionMutation();

  const [selectedPackageKey, setSelectedPackageKey] = useState(null);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [editPackageName, setEditPackageName] = useState("");
  const [editPackagePrice, setEditPackagePrice] = useState(0);
  const [editDescription, setEditDescription] = useState([]);
  const [editSubscriptionDuration, setEditSubscriptionDuration] =
    useState("YEARLY");

  const subscriptionDurations = ["MONTHLY", "YEARLY"];

  useEffect(() => {
    if (packageData && packageData.length > 0 && !selectedPackageKey) {
      setSelectedPackageKey(packageData[0]._id);
    }
  }, [packageData, selectedPackageKey]);

  const handlePackageSelect = (id) => {
    setSelectedPackageKey(id);
  };

  const openEditModal = (e) => {
    e.stopPropagation();
    const pkg = packageData?.find((p) => p._id === selectedPackageKey);
    if (!pkg) return;

    setEditingPackageId(pkg._id);
    setEditPackageName(pkg.packageName);
    setEditPackagePrice(pkg.packagePrice);
    setEditDescription(pkg.description || []);
    setEditSubscriptionDuration(pkg.subscriptionDuration);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setEditPackageName("");
    setEditPackagePrice(0);
    setEditDescription([]);
    setEditSubscriptionDuration("YEARLY");
    setIsAddModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleFeatureChange = (index, value) => {
    setEditDescription((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addDescriptionInput = () => {
    setEditDescription((prev) => [...prev, ""]);
  };

  const handleSaveChanges = async (values) => {
    console.log(values);
    if (!editPackageName.trim()) {
      alert("Package name cannot be empty");
      return;
    }

    if (!editSubscriptionDuration) {
      alert("Subscription duration is required");
      return;
    }

    if (!editPackagePrice || editPackagePrice <= 0) {
      alert("You must give the price of your package");
      return;
    }

    const filteredDescription = editDescription.filter((f) => f.trim() !== "");
    if (filteredDescription.length === 0) {
      alert("Description is required");
      return;
    }

    if (!editingPackageId) {
      alert("No package selected to update.");
      return;
    }

    const updatedPackage = {
      id: editingPackageId,
      packageName: editPackageName.trim(),
      subscriptionDuration: editSubscriptionDuration,
      packagePrice: editPackagePrice,
      description: filteredDescription,
    };

    try {
      const res = await editSubscription(updatedPackage).unwrap();
      console.log("edit res", res);
      refetch();
      toast.success("Package updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  const handleAddPackage = async () => {
    const newPackage = {
      // id: `new_${Date.now()}`,
      packageName: editPackageName,
      subscriptionDuration: editSubscriptionDuration,
      packagePrice: editPackagePrice,
      description: editDescription.filter((f) => f.trim() !== ""),
      type: "SUBSCRIPTION_PLAN",
    };
    console.log("New package added:", newPackage);

    try {
      const res = await addSubscription(newPackage).unwrap();
      console.log("add res", res);
      refetch();
      toast.success("Package added successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update package:", error);
    }
    setIsAddModalOpen(false);
    // TODO: add newPackage to your packages array or backend
  };

  if (isLoading || isAdding || isEditing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Privacy Policy..." />
      </div>
    );
  }

  if (editError || addError) {
    return <p>Error...</p>;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#334161",
            },
            Select: {
              colorBgElevated: "rgb(173,114,255)",
              optionSelectedBg: "#E2BAFA",
              optionActiveBg: "rgb(233,218,255)",
              colorText: "#fff",
              optionSelectedColor: "rgb(0,0,0)",
              colorBorder: "#E2BAFA",
              fontSize: 14,
              selectorBg: "rgba(0,0,0,0)",
              colorTextPlaceholder: "#fff",
              colorIcon: "#bbb",
            },
            Input: {
              colorTextPlaceholder: "#fff",
            },
          },
        }}
      >
        <Modal
          visible={visible}
          onCancel={onCancel}
          footer={null}
          width={1000}
          bodyStyle={{ padding: "0px" }}
          className="subscription-modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-3 px-6 border-b border-[#f0f0f0]">
            <div className="flex items-center">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={onCancel}
                style={{ marginRight: 10, color: "#fff" }}
              />
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                Subscriptions
              </Title>
            </div>
            <Button
              onClick={openAddModal}
              className="bg-gradient-to-r from-[#D7A52C] to-[#A020F0]  text-white p-4 border-none"
            >
              <div className="flex items-center gap-2">
                <FaPlusCircle /> <p>Add New</p>
              </div>
            </Button>
          </div>

          <div className="p-6">
            {/* Package Cards */}
            <div className="flex gap-4 mb-6">
              {packageData?.map((pkg) => {
                const isSelected = selectedPackageKey === pkg._id;
                return (
                  <Card
                    key={pkg._id}
                    style={{
                      backgroundColor: "#9065BC",
                      color: "white",
                      cursor: "pointer",
                      flex: 1,
                      border: isSelected
                        ? "2px solid #fff"
                        : "2px solid transparent",
                      transition: "border 0.3s",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                    bodyStyle={{
                      padding: "16px",
                      textAlign: "center",
                      flexGrow: 1,
                    }}
                    onClick={() => handlePackageSelect(pkg._id)}
                  >
                    <div
                      className={`py-2 rounded-md ${
                        isSelected
                          ? "bg-gradient-to-r from-[#DDAC34] to-[#67139b] text-[#fff]"
                          : "bg-[#7f57b3]"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {pkg.subscriptionDuration}
                    </div>

                    <div className="flex flex-col gap-2 px-2 py-5 rounded-md flex-grow">
                      <div>
                        <p className="text-3xl font-medium mb-1">
                          ${pkg.packagePrice}
                        </p>
                        <hr />
                      </div>
                      {pkg.description.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <IoCheckmarkCircleOutline />
                          <p className="m-0">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {isSelected && (
                      <Button
                        block
                        onClick={openEditModal}
                        style={{
                          background:
                            "linear-gradient(90deg, #DDAC34, #67139b)",
                          borderColor: "#9254de",
                          height: "35px",
                          color: "#fff",
                          fontSize: "16px",
                          marginTop: "auto",
                        }}
                      >
                        <FaRegEdit style={{ marginRight: 6 }} /> Edit
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          visible={isEditModalOpen}
          onCancel={closeEditModal}
          footer={null}
          title={null}
          width={600}
          destroyOnClose
        >
          <div className="bg-[#3c5b85] text-white font-semibold p-4 rounded-lg mb-5">
            Edit Package: {editPackageName || selectedPackageKey}
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm text-white">
              Package Name
            </label>
            <Input
              value={editPackageName}
              onChange={(e) => setEditPackageName(e.target.value)}
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "transparent",
                color: "white",
              }}
              placeholder="Edit package name"
            />
          </div>

          <div className="mb-3">
            <label className="font-medium text-sm text-white">
              Subscription Duration
            </label>
            <Select
              value={editSubscriptionDuration}
              onChange={setEditSubscriptionDuration}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              disabled={isEditing}
            >
              {subscriptionDurations.map((duration) => (
                <Select.Option key={duration} value={duration}>
                  {duration}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="mb-3">
            <label className="font-medium text-sm text-white">Price</label>
            <Input
              value={editPackagePrice}
              onChange={(e) => setEditPackagePrice(Number(e.target.value))}
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "transparent",
                color: "white",
              }}
              placeholder="Enter package price"
              type="number"
              min={0}
              disabled={isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="font-medium text-sm text-white">Features</label>
            <div className="flex flex-col gap-2">
              {editDescription.map((feature, idx) => (
                <Input
                  key={idx}
                  value={feature}
                  onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  placeholder="Enter feature"
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    background: "transparent",
                    color: "white",
                  }}
                  disabled={isEditing}
                />
              ))}
              <Button
                type="dashed"
                onClick={addDescriptionInput}
                style={{
                  marginTop: 10,
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  background: "transparent",
                  color: "white",
                }}
                disabled={isEditing}
              >
                Add Feature
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSaveChanges}
            disabled={isEditing}
            style={{
              marginTop: 20,
              width: "100%",
              background: "linear-gradient(90deg, #D7A52C, #A020F0)",
              color: "#fff",
              height: "50px",
              fontWeight: "600",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
            }}
          >
            {isEditing ? "Saving..." : "Save Changes"}
          </Button>
        </Modal>

        {/* Add Modal */}
        <Modal
          visible={isAddModalOpen}
          onCancel={closeAddModal}
          footer={null}
          title={null}
          width={600}
        >
          <div className="bg-[#3c5b85] text-white font-semibold p-4 rounded-lg mb-5">
            Add New Package
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm text-white">
              Package Name
            </label>
            <Input
              value={editPackageName}
              onChange={(e) => setEditPackageName(e.target.value)}
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "transparent",
                color: "white",
              }}
              placeholder="Enter package name"
            />
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm text-white">
              Subscription Duration
            </label>
            <Select
              value={editSubscriptionDuration}
              onChange={setEditSubscriptionDuration}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              {subscriptionDurations.map((duration) => (
                <Select.Option key={duration} value={duration}>
                  {duration}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm text-white">Price</label>
            <Input
              value={editPackagePrice}
              onChange={(e) => setEditPackagePrice(Number(e.target.value))}
              style={{
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "transparent",
                color: "white",
              }}
              placeholder="Enter package price"
              type="number"
              min={0}
            />
          </div>
          <div>
            <label className="font-medium text-sm text-white">Features</label>
            <div className="flex flex-col gap-2">
              {editDescription.map((feature, idx) => (
                <Input
                  key={idx}
                  value={feature}
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    background: "transparent",
                    color: "white",
                  }}
                  onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  placeholder="Enter feature"
                />
              ))}
              <Button
                type="dashed"
                onClick={addDescriptionInput}
                style={{
                  marginTop: 10,
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  background: "transparent",
                  color: "white",
                }}
              >
                Add Feature
              </Button>
            </div>
          </div>
          <Button
            onClick={handleAddPackage}
            style={{
              marginTop: 20,
              width: "100%",
              background: "linear-gradient(90deg, #D7A52C, #A020F0)",
              color: "#fff",
              height: "40px",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Add Package
          </Button>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default BuySubscriptionModal;
