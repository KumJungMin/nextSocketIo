"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/lib/fetchers";
import Avatar from "./Avatar";

function Form() {
  const router = useRouter();
  const [avatarId, setAvatarId] = useState(
    Math.random().toString(36).substring(7)
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleSubmit({
      name,
      email,
      router,
      avatarId,
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Avatar avatarId={avatarId} setAvatarId={setAvatarId} />
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">이름</span>
          </label>
          <input
            type="text"
            value={name}
            placeholder="이름"
            className="input input-bordered w-full"
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            className="input input-bordered w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <button className="btn btn-primary w-full">가입하기</button>
    </form>
  );
}

export default Form;
