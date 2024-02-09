"use client";
import React from "react";
import { useSelectedUser } from "@/store/userStore";

import Topbar from "./Topbar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Messages() {
  // useSelectedUser는 userStore에서 selectedUser를 가져오는 hook입니다.
  // selectedUser는 현재 선택된 유저의 정보를 담고 있습니다.
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  return (
    <div className="bg-image messages w-full min-h-screen z-0 hidden md:w-1/2 lg:w-2/3 md:flex md:flex-col flex-col">
      <Topbar selectedUser={selectedUser} />
      <div
        className={`max-w-sm md:max-w-3xl w-full mx-auto mt-auto mb-10 ${
          selectedUser ? "" : "md:hidden"
        }`}
      >
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}

export default Messages;
