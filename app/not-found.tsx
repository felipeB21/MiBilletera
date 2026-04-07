"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-background">
      <div className="relative flex items-center justify-center [perspective:1000px]">
        <Image
          src="/wallet.svg"
          alt="wallet"
          width={600}
          height={600}
          priority
          className="w-[320px] sm:w-[420px] md:w-[500px] h-auto select-none pointer-events-none"
        />

        <div
          className="absolute w-50 h-20 blur-2xl opacity-30"
          style={{
            top: "52%",
            left: "55%",
            transform: "translate(-50%, -50%) rotate(-20deg)",
            background: "#22c55e",
          }}
        />
      </div>
      <h1 className="text-5xl font-heading">404</h1>
      <p className="absolute bottom-10 text-sm text-foreground/60 font-mono">
        Esta página no existe
      </p>
    </div>
  );
}
