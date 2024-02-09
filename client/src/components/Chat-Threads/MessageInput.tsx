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
  const [inpValue, setInpValue] = useState("");
  const [showEmojies, setShowEmojies] = useState(false);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const [cookie] = useCookies(["user"]);

  const socket = io("http://localhost:4000");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit("private message", selectedUser.email, inpValue, cookie.user);
    setInpValue("");
  }

  function onEmojiClick(emojiObject: { emoji: string }) {
    setInpValue((pre) => pre + emojiObject.emoji);
  }

  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Message"
          className="input w-full pl-14 input-bordered"
          onChange={(e) => setInpValue(e.target.value)}
          value={inpValue}
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
