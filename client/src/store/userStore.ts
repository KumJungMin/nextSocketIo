import { selectedUserState, userState } from "@/types";
import { create } from "zustand";
// zustand는 상태관리 라이브러리
// zustand는 리덕스와 비슷한 기능을 제공하지만, 리덕스보다 훨씬 더 가볍고 간단하다.

export const useUser = create<userState>((set) => ({
  myUser: undefined,
  setUser: (user) => set({ myUser: user }),
}));

export const useAllUsers = create((set) => ({
  users: undefined,
  setUsers: (users: any) => set({ users }),
}));

export const useSelectedUser = create<selectedUserState>((set) => ({
  selectedUser: undefined,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useMessages = create((set) => ({
  message: undefined,
  setMessages: (messages: any) => set({ messages }),
}));
