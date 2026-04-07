"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SignIn() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={"rounded-full font-bold font-heading"}>
            <UserCircleIcon />
            Iniciar sesión
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incia sesión</DialogTitle>
          <DialogDescription>
            Ingresa con alguna de estas opciones.
          </DialogDescription>
          <div className="p-5 flex flex-col items-center justify-center w-full gap-2">
            <Button
              className={"w-full"}
              variant={"secondary"}
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                })
              }
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={14}
                height={14}
              />
              Google
            </Button>
            <Button
              className={"bg-black text-stone-50 w-full"}
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                })
              }
            >
              <Image
                src="/icons/github.svg"
                alt="Github"
                width={14}
                height={14}
              />
              Github
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
