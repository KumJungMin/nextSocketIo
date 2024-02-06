import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";

export async function handleSubmit({
  name,
  email,
  router,
  avatarId,
}: {
  name: string;
  email: string;
  router: AppRouterInstance;
  avatarId: string;
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
    // socket.emit("joined", "new user");
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
