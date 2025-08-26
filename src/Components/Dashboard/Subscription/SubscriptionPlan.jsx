import { Button, Modal, Input, ConfigProvider, Select, Spin } from "antd";
import { useState } from "react";
import {
  useAddSubscriptionMutation,
  useAllSubscriptionPlansQuery,
  useDeleteSubscriptionMutation,
  useEditSubscriptionMutation,
} from "../../../Redux/api/subscriptionApi";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast } from "sonner";

export default function SubscriptionPlan() {
  const {
    data: subscriptionPlanData,
    isLoading,
    refetch,
  } = useAllSubscriptionPlansQuery();
  const subscriptionPlans = subscriptionPlanData?.data;
  const [addSubscription, { isLoading: isAdding }] =
    useAddSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] =
    useEditSubscriptionMutation();
  const [deleteSubscription, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  // State for modals
  const [isAddOrEditModalVisible, setIsAddOrEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null); // For editing
  const [planToDelete, setPlanToDelete] = useState(null); // For deletion

  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageType, setPackageType] = useState(null);
  const [packageDetails, setPackageDetails] = useState([]);

  const packageTypes = ["monthly", "yearly"];

  const addOrEditSubscriptionPlan = async () => {
    const price = parseFloat(packagePrice);

    if (isNaN(price)) {
      alert("Please enter a valid price.");
      return;
    }

    const planData = {
      name: packageName,
      price: price,
      type: packageType,
      details: packageDetails,
    };

    console.log("Submitted", planData);

    try {
      const editData = {
        id: planToEdit?._id,
        name: planData?.name,
        price: planData?.price,
        type: planData?.type,
        details: planData?.details,
      };
      console.log("editData", editData);

      if (planToEdit) {
        const response = await updateSubscription(editData).unwrap();
        console.log(response);
        if (response.success) {
          refetch();
          toast.success("Package Updated Succesfully");
          console.log("Subscription updated:", response);
        }
      } else {
        const response = await addSubscription(planData).unwrap();
        console.log("Subscription added:", response);
      }

      setIsAddOrEditModalVisible(false);
      // Reset input fields
      setPackageName("");
      setPackagePrice("");
      setPackageType("");
      setPackageDetails([]);
    } catch (error) {
      console.error("Error while adding/updating the plan:", error);
    }
  };

  const showAddOrEditModal = (plan) => {
    console.log("plan to edit", plan);
    if (plan) {
      setPlanToEdit(plan);
      setPackageName(plan.name);
      setPackagePrice(plan.price);
      setPackageType(plan.type);
      setPackageDetails(plan.details || []);
    } else {
      // Adding a new plan
      setPlanToEdit(null);
      setPackageName("");
      setPackagePrice("");
      setPackageType("");
      setPackageDetails([]);
    }
    setIsAddOrEditModalVisible(true);
  };

  const showDeleteModal = (plan) => {
    setPlanToDelete(plan);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting plan", planToDelete);
      const response = await deleteSubscription({
        id: planToDelete._id,
      }).unwrap();
      if (response.success) {
        toast.success("Subscription Deleted Succesfully");
        refetch();
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error("Error while deleting the plan:", error);
    }
  };

  const handleCancel = () => {
    setPlanToEdit(null);
    setPackageName("");
    setPackagePrice("");
    setPackageType("");
    setPackageDetails([]);
    setIsAddOrEditModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  // Add benefit to the list
  const addBenefit = () => {
    setPackageDetails([...packageDetails, ""]);
  };

  // Remove benefit from the list
  const removeBenefit = (index) => {
    const updatedBenefits = [...packageDetails];
    updatedBenefits.splice(index, 1);
    setPackageDetails(updatedBenefits);
  };

  // Handle benefit input change
  const handleBenefitChange = (value, index) => {
    const updatedBenefits = [...packageDetails];
    updatedBenefits[index] = value;
    setPackageDetails(updatedBenefits);
  };

  if (isLoading || isAdding || isUpdating || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen gap-5 p-5">
      <div className="flex flex-wrap gap-5">
        {subscriptionPlans?.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 text-white rounded-lg shadow-lg w-72"
          >
            <div className="flex items-center justify-between bg-[#BB7031] p-4 rounded-lg">
              <div>
                <p className="text-lg font-medium capitalize">{plan?.type}</p>
                <p className="text-sm">Payment Package</p>
              </div>
              <p className="text-2xl font-medium">${plan?.price}</p>
            </div>
            <div className="flex flex-col gap-4 bg-gradient-to-tr from-[#905E26] 10% via-[#F1CC47] 40% to-[#F5EC9B] 90% p-4 rounded-lg">
              <div className="flex justify-center">
                <p className="text-3xl font-semibold text-center text-[#151D4A]">
                  ${plan.price}/
                  <span>{plan.type === "yearly" ? "Year" : "Month"}</span>
                </p>
              </div>

              <hr className="border border-[#151D4A]" />

              <ul className="flex flex-col gap-2 text-[#151D4A] text-sm">
                {plan.details.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaRegCheckCircle />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={() => showAddOrEditModal(plan)}
                  className="w-24 hover:underline bg-[#151D4A] text-white border-none"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => showDeleteModal(plan)}
                  className="w-24 text-[#151D4A] bg-transparent border-[#151D4A] hover:underline"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => showAddOrEditModal(null)} // Open modal for adding new plan
        className="bg-gradient-to-tr from-[#905E26] 10% via-[#F1CC47] 40% to-[#F5EC9B] 90% p-4 rounded-lg border-none w-32 font-medium h-10 text-lg"
      >
        Add More
      </Button>

      {/* Add/Edit Subscription Plan Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#47536c",
              headerBg: "#47536c",
              titleColor: "rgb(255,255,255)",
            },
            Form: {
              labelColor: "#FFFFFF",
              labelRequiredMarkColor: "#FFFFFF",
              labelFontSize: 16,
            },
            Input: {
              activeBg: "#47536C",
              hoverBg: "#47536C",
              hoverBorderColor: "rgb(250,219,20)",
              activeBorderColor: "rgb(250,219,20)",
              colorText: "rgb(255,255,255)",
              colorBgContainer: "#47536C",
            },
          },
        }}
      >
        <Modal
          title={
            planToEdit ? "Edit Subscription Plan" : "Add Subscription Plan"
          }
          visible={isAddOrEditModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <p className="py-1 text-base text-white">Package Name</p>
            <Input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="h-10 bg-transparent border-[#FCB917]"
            />
          </div>

          <div>
            <p className="py-1 text-base text-white">Package Price</p>
            <Input
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              type="number"
              className="h-10 bg-transparent border-[#FCB917]"
            />
          </div>

          {/* Dynamic Benefits List */}
          <p className="py-1 text-base text-white">Package Type</p>

          <div className="flex items-start gap-5 mb-2">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorBgContainer: "rgba(0,0,0,0)",
                    selectorBg: "rgba(0,0,0,0)",
                    colorText: "rgb(255,255,255)",
                    colorTextPlaceholder: "rgb(255,255,255)",
                    colorBorder: "rgb(252,185,23)",
                    hoverBorderColor: "rgb(252,185,23)",
                    colorBgElevated: "rgb(7,27,73)",
                    optionActiveBg: "rgb(51,65,97)",
                    optionSelectedBg: "rgb(252,185,23)",
                    optionHeight: 40,
                  },
                },
              }}
            >
              <Select
                value={packageType}
                onChange={(value) => setPackageType(value)}
                placeholder="Select Type"
                style={{
                  width: "100%",
                  height: "40px",
                  background: "transparent",
                }}
              >
                {packageTypes.map((type, index) => (
                  <Select.Option key={index} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>
          <div>
            <p className="py-1 text-base text-white">Benefits</p>
            <div>
              {packageDetails.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleBenefitChange(e.target.value, index)}
                    className="h-10 bg-transparent border-[#FCB917] w-[420px]"
                    placeholder="Benefit"
                  />
                  <Button
                    type="link"
                    onClick={() => removeBenefit(index)}
                    className="text-white"
                  >
                    X
                  </Button>
                </div>
              ))}
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBg: "#F1CC47",
                      defaultHoverColor: "#071b49",
                      defaultHoverBorderColor: "rgb(230,4,15)",
                    },
                  },
                }}
              >
                <Button
                  type="dashed"
                  onClick={addBenefit}
                  icon={<FaRegCheckCircle />}
                  className="w-full bg-[#151D4A] text-white border-none mb-2 h-10"
                >
                  Add Benefit
                </Button>
              </ConfigProvider>
            </div>
          </div>

          <Button
            onClick={addOrEditSubscriptionPlan}
            className="text-lg font-medium w-full bg-gradient-to-tr from-[#905E26] 10% via-[#F1CC47] 40% to-[#F5EC9B] 90% border-none h-10"
          >
            {planToEdit ? "Save Changes" : "Add Plan"}
          </Button>
        </Modal>
      </ConfigProvider>

      {/* Delete Confirmation Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#47536c",
              headerBg: "#47536c",
              titleColor: "rgb(255,255,255)",
            },
          },
        }}
      >
        <Modal
          title="Are you sure you want to delete this plan?"
          visible={isDeleteModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{
            style: {
              backgroundColor: "#eac445",
              borderColor: "#eac445",
              color: "#151D4A",
              fontWeight: "bold",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#151D4A",
              borderColor: "#5A5A5A",
              color: "#fff",
              fontWeight: "bold",
            },
          }}
        >
          <p className="text-white">This action cannot be undone.</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
