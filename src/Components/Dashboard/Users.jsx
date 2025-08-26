/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select } from "antd";
import UsersTable from "../Tables/UsersTable";
import {
  useAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useUnblockUserMutation,
} from "../../Redux/api/userApi";
import ViewUserModal from "../UI/ViewUserModal";
import DeleteUserModal from "../UI/DeleteUserModal";
import { toast } from "sonner";

export default function Users() {
  const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const userData = allUsers?.data;
  // console.log(userData);

  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // console.log("userData", userData);

  const [isViewCustomer, setIsViewCustomer] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    if (!userData) return [];

    let filteredUsers = userData.filter((user) => user.role === "USER");

    if (searchText) {
      filteredUsers = filteredUsers.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredUsers = filteredUsers.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filteredUsers;
  }, [userData, searchText, statusFilter]);

  const onSearch = (value) => {
    setSearchText(value);
  };
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const showCustomerViewModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewCustomer(true);
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
      setIsViewCustomer(false);
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
      setIsViewCustomer(false);
      toast.success("Unblocked the User Succesfully..!");
      refetch();
    } catch (error) {
      console.error("Block user error:", error);
      toast.error("Error blocking user.");
    }
  };

  const handleCancel = () => {
    setIsViewCustomer(false);
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="min-h-[93vh]">
      <div className="rounded ">
        <div className="flex justify-end p-2">
          {/* <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#2D665F]">User List</h1>
          </div> */}
          <div className="flex items-center justify-end gap-4">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "#ccc",
                  },
                  Select: {
                    colorBgElevated: "#F1CC47",
                    optionSelectedBg: "#334161",
                    optionActiveBg: "#a48f04",
                    colorText: "#fff",
                    optionSelectedColor: "#fff",
                    colorBorder: "#E2BAFA",
                    fontSize: 14,
                    selectorBg: "rgba(0,0,0,0)",
                    colorTextPlaceholder: "#fff",
                    colorIcon: "#bbb",
                  },
                },
              }}
            >
              <Input
                placeholder="Search User..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="py-2 text-base font-semibold bg-transparent"
                prefix={
                  <SearchOutlined className="text-[#abc] font-bold text-lg mr-2" />
                }
              />
              <Select
                placeholder="Filter by Status"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                style={{ width: 200, height: 44 }}
                className="!border-[#2D665F]"
              >
                <Select.Option value="">All</Select.Option>
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="BLOCKED">Blocked</Select.Option>
              </Select>
            </ConfigProvider>
          </div>
        </div>
        <div className="px-2 py-5 rounded-lg lg:px-6">
          <UsersTable
            data={filteredData}
            // loading={loadingUser}
            showCustomerViewModal={showCustomerViewModal}
            showDeleteModal={showDeleteModal}
            pageSize={10}
          />
        </div>

        <ViewUserModal
          isViewCustomer={isViewCustomer}
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
