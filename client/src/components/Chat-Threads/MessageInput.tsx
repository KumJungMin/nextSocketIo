"use client";
import { useSelectedUser } from "@/store/userStore";
import type { FormEvent } from "react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

// dynamic은 코드 스플리팅을 위한 next.js의 함수
// Picker는 emoji-picker-react 라이브러리를 사용하기 위해 동적으로 import
// ssr을 false 설정하여, 서버사이드 렌더링을 사용하지 않도록 설정
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [showEmojies, setShowEmojies] = useState(false);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const [cookie] = useCookies(["user"]);

  // 소켓 통신을 localhost:4000으로 연결(socket.io-client 사용)
  const socket = io("http://localhost:4000");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // emit은 소켓을 통해 이벤트를 전달하는 함수
    // "private message"이벤트에, 메시지 내용과 선택된 유저의 이메일, 내 유저 정보를 전달
    // cookie.user에는 내 유저 정보가 담겨 있어, 서버에서 내 유저 정보를 확인할 수 있음
    socket.emit("private message", selectedUser.email, inputValue, cookie.user);
    setInputValue("");
  }

  function onEmojiClick(emojiObject: { emoji: string }) {
    setInputValue((pre) => pre + emojiObject.emoji);
  }

  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Message"
          className="input w-full pl-14 input-bordered"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowEmojies(!showEmojies)}
        className="absolute top-1/2 left-5 -translate-y-1/2"
      >
        A
      </button>
      {showEmojies && (
        <div className="absolute bottom-full">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <button
        type="submit"
        className="absolute top-1/2 right-5 -translate-y-1/2"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
