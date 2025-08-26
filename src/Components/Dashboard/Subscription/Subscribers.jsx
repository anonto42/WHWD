/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { useAllSubscribersQuery } from "../../../Redux/api/subscriptionApi";
import SubscriberTable from "../../Tables/SubscriberTable";
import DeleteUserModal from "../../UI/DeleteUserModal";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useUnblockUserMutation,
} from "../../../Redux/api/userApi";
import ViewSubscriberModal from "../../UI/ViewSubscriberModal";

export default function Subscribers() {
  const {
    data: subscribersData,
    loadingUser,
    refetch,
  } = useAllSubscribersQuery();
  const subscriber = subscribersData?.data;
  console.log("subscriber", subscriber);

  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // console.log("userData", userData);

  const [isViewSubscriber, setIsViewSubscriber] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showSubscriberViewModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewSubscriber(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async (data) => {
    console.log("delete user", data);
    try {
      await deleteUser({ id: data._id }).unwrap();
      setIsDeleteModalVisible(false);
      toast.success("User Deleted Succesfully..!");
      refetch();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const handleBlock = async (data) => {
    console.log("block user", data);
    try {
      await blockUser({ id: data._id }).unwrap();
      setIsViewSubscriber(false);
      toast.success("Blocked User Succesfully..!");
      refetch();
    } catch (error) {
      console.error("Block user error:", error);
      toast.error("Error blocking user.");
    }
  };

  const handleUnblock = async (data) => {
    console.log("block user", data);
    try {
      await unblockUser({ id: data._id }).unwrap();
      setIsViewSubscriber(false);
      toast.success("Unblocked the User Succesfully..!");
      refetch();
    } catch (error) {
      console.error("Block user error:", error);
      toast.error("Error blocking user.");
    }
  };

  const handleCancel = () => {
    setIsViewSubscriber(false);
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="min-h-[93vh]">
      <div className="rounded ">
        <div className="px-2 py-5 rounded-lg lg:px-6">
          <SubscriberTable
            data={subscriber}
            // loading={loadingUser}
            showSubscriberViewModal={showSubscriberViewModal}
            showDeleteModal={showDeleteModal}
            pageSize={10}
          />
        </div>

        <ViewSubscriberModal
          isViewSubscriber={isViewSubscriber}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          isBlocking={isBlocking}
        />
        <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
