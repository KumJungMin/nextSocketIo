"use client";
import { fetchUser } from "@/lib/fetchers";
import { useUser } from "@/store/userStore";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { shallow } from "zustand/shallow";
import SearchBar from "./SearchBar";
// import ChatList from "./ChatList";

function Sidebar() {
  // useCookies는 쿠키를 사용할 수 있게 해주는 hook입니다.
  // user라는 이름의 쿠키를 사용할 수 있게 해주고, setCookie는 쿠키를 설정할 수 있게 해줍니다.
  const [cookie, setCookie] = useCookies(["user"]);

  // useUser는 userStore에서 myUser와 setUser를 가져오는 hook입니다.
  // myUser는 현재 로그인한 유저의 정보를 담고 있고, setUser는 myUser를 설정하는 함수입니다.
  // shallow는 zustand의 성능을 최적화하는 옵션으로, 이 옵션을 사용하면 myUser나 setUser가 변경될 때만 컴포넌트가 리렌더링됩니다.
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: state.myUser, setUser: state.setUser }),
    shallow
  );

  // useEffect는 컴포넌트가 렌더링될 때마다 특정 작업을 수행할 수 있게 해주는 hook입니다.
  // 여기서는 fetchUser를 사용해서 서버에 로그인한 유저의 정보를 요청합니다.
  // cookie.user가 변경될 때마다 fetchUser를 호출합니다.
  useEffect(() => {
    fetchUser(cookie, setUser);
  }, [cookie.user]);

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-white h-screen">
      {/* SEARCHBAR */}
      <SearchBar user={myUser} />
      {/* CHATLIST */}
      {/* {myUser && <ChatList mySelf={myUser} />} */}
    </div>
  );
}

export default Sidebar;
