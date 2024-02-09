import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { userProps } from "@/types";

export async function handleSubmit({
  name,
  email,
  router,
  avatarId,
  socket,
}: {
  name: string;
  email: string;
  router: AppRouterInstance;
  avatarId: string;
  socket: any;
}) {
  try {
    await fetch("/auth", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        imageId: `https://robohash.org/${avatarId}.png`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    socket.emit("joined", "new user");
    router.push("/chat");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUser(
  cookie: { user?: any },
  setUser: { (user: any): void; (arg: any): void }
) {
  const accessToken = cookie.user;
  const response = await fetch("/user", {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const user = await response.json();
  setUser(user[0]);
}

export async function fetchUsers(mySelf: userProps, setUsers: any) {
  const data = await fetch("/users");
  const myUsers = await data.json();
  setUsers(myUsers.filter((user: any) => user.email !== mySelf?.email));
}

export async function fetchMessages(
  sender: any,
  receiver: any,
  setMessages: any
) {
  if (sender && receiver) {
    try {
      // 전송자 이메일, 수신자 이메일을 이용하여 메시지를 가져옵니다.
      const res = await fetch(
        `/messages?sender=${sender?.email}&receiver=${receiver?.email}`
      );
      const data = await res?.json();

      // setMessages를 이용하여 메시지를 설정합니다.
      setMessages(data);
    } catch (err) {
      console.log(err);
      setMessages(null);
    }
  }
}
