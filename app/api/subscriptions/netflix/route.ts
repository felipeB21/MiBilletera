import { NextResponse } from "next/server";

export async function GET() {
  const netflix = {
    id: "netflix",
    name: "Netflix",
    slug: "netflix",

    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 8999,
        currency: "ARS",
        interval: "month",
      },
      {
        id: "standard",
        name: "Standard",
        price: 14999,
        currency: "ARS",
        interval: "month",
        maxExtraMembers: 1,
        extraMemberPrice: 5399,
      },
      {
        id: "premium",
        name: "Premium",
        price: 19999,
        currency: "ARS",
        interval: "month",
        maxExtraMembers: 2,
        extraMemberPrice: 5399,
      },
    ],

    addons: [
      {
        id: "extra-member",
        name: "Extra Member",
        price: 5399,
        currency: "ARS",
        interval: "month",
      },
    ],

    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(netflix);
}
