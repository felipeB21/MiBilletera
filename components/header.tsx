import Image from "next/image";
import Link from "next/link";

import Session from "./session";

const NAVIGATION = [
  { name: "Servicios", slug: "services" },
  { name: "API", slug: "api" },
  { name: "Precio", slug: "pricing" },
];

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-4xl flex items-center justify-between px-5 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
        <Link href="/" className="text-lg font-bold flex items-center gap-2">
          <Image src="/wallet.svg" alt="wallet" width={42} height={42} />
          MiBilletera
        </Link>
        <nav>
          <ul className="flex items-center gap-7">
            {NAVIGATION.map((link) => (
              <Link
                href={link.slug}
                key={link.slug}
                className="text-xs font-medium text-foreground hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </nav>
        <Session />
      </div>
    </header>
  );
}
