"use client";
import { fetchMessages } from "@/lib/fetchers";
import { useMessages, useSelectedUser, useUser } from "@/store/userStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import MessageItem from "./MessageItem";
import { io } from "socket.io-client/debug";

function MessageList() {
  const sender = useUser((state: any) => state.myUser);
  const receiver = useSelectedUser((state: any) => state.selectedUser);
  // useMessages는 zustand의 hook으로, 상태를 가져오거나 설정할 수 있다.
  // shallow는 zustand의 hook을 사용할 때, 상태가 변경되었을 때만 리렌더링을 하도록 설정
  const { messages, setMessages } = useMessages(
    (state: any) => ({
      messages: state.messages,
      setMessages: state.setMessages,
    }),
    shallow
  );

  // useAutoAnimate는 애니메이션을 위한 hook
  const [parent] = useAutoAnimate();

  // 소켓 로직은 하나의 파일로 분리하는 게 좋음 -> 컴포저블로 분리
  const socket = io("http://localhost:4000");

  socket.on("refresh", () => {
    fetchMessages(sender, receiver, setMessages);
  });

  useEffect(() => {
    fetchMessages(sender, receiver, setMessages);
  }, [receiver]);

  return (
    // parent는 애니메이션을 위한 ref로, 애니메이션이 적용될 부모 요소에 적용
    <div
      ref={parent}
      className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar"
    >
      {messages
        ? messages.map((item: any, i: number) => (
            <MessageItem
              key={i}
              isUser={sender.email == item.sender}
              message={item.message}
            />
          ))
        : ""}
    </div>
  );
}

export default MessageList;
