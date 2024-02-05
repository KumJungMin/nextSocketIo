"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/lib/fetchers";
import Avatar from "./Avatar";

function Form() {
  const router = useRouter();
  const [avatarId, setAvatarId] = useState(
    Math.random().toString(36).substring(7)
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
      <Avatar avatarId={avatarId} setAvatarId={setAvatarId} />
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">이름</span>
          </label>
          <input
            type="text"
            placeholder="이름"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">이메일</span>
          </label>
          <input
            type="email"
            placeholder="이메일"
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
      <button className="btn btn-primary w-full">가입하기</button>
    </form>
  );
}

export default Form;
