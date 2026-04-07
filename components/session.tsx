import { getSession } from "@/lib/auth-server";
import SignIn from "./sign-in";
import Image from "next/image";

export default async function Session() {
  const user = await getSession();
  return (
    <>
      {user ? (
        <Image
          src={user.image as string}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <SignIn />
      )}
    </>
  );
}
