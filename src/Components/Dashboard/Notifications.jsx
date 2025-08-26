/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Pagination } from "antd";

const notifications = [
  {
    id: 1,
    message: "You have a new story request from a user.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "John Doe",
  },
  {
    id: 2,
    message: "A new user has just joined the app.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Jane Smith",
  },
  {
    id: 3,
    message: "You have a story request pending from a user in the app.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Michael Johnson",
  },
  {
    id: 4,
    message: "You have another story request waiting for your approval.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Emily Davis",
  },
  {
    id: 5,
    message: "A new user has signed up and joined the app today.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Sarah Lee",
  },
  {
    id: 6,
    message: "You have a new story request pending review from a user.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "David Wilson",
  },
  {
    id: 7,
    message: "Another story request has been submitted by a user in the app.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Laura Martinez",
  },
  {
    id: 8,
    message: "A new user just registered and is now active on the app.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "James Brown",
  },
  {
    id: 9,
    message: "An additional user has joined the app and is ready to explore.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "Rachel Adams",
  },
  {
    id: 10,
    message:
      "A new user has successfully joined and created an account on the app.",
    location: "Buffalo, USA",
    time: "10 May, 2024",
    senderName: "William Moore",
  },
];

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen bg-[#334161]">
      {/* Search */}
      <div className="flex justify-end items-center py-4 px-6">
        <div className="w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg border border-gray-300 h-12"
          />
        </div>
      </div>

      <div className="px-6 pt-4">
        {notifications
          .slice((currentPage - 1) * 5, currentPage * 5)
          .map((notification) => (
            <div
              key={notification.id}
              className="flex items-start justify-between p-4 border-b border-gray-200 last:border-none hover:bg-gray-50 group"
            >
              <div>
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="group-hover:bg-black rounded-lg">
                    <img
                      src="/images/user.png" // Replace with actual user image or avatar
                      alt="User Avatar"
                      className="size-10 rounded-full object-cover"
                    />
                  </div>

                  {/* Notification text */}
                  <div className="">
                    {/* Sender Name */}
                    <div className="font-medium text-[#78cec2] group-hover:text-black">
                      {notification.senderName}
                    </div>
                    <div className="text-sm text-white group-hover:text-black">
                      {notification.location}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-[#feffc4] group-hover:text-black mt-2">
                  {notification.message}
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-[#c0ddeb] group-hover:text-black self-end">
                {notification.time}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          current={currentPage}
          total={notifications.length}
          pageSize={5}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Notifications;
