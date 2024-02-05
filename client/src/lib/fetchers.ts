import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";

export async function handleSubmit({
  event,
  name,
  email,
  router,
  avatarId,
}: {
  event: FormEvent<HTMLFormElement>;
  name: string;
  email: string;
  router: AppRouterInstance;
  avatarId: string;
}) {
  event.preventDefault();
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
    // router.push("/chat");
  } catch (error) {
    console.error(error);
  }
}
