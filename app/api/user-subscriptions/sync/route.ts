import { db } from "@/db";
import { userSubscription } from "@/db/schema";
import { getSession } from "@/lib/auth-server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const user = await getSession();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body;

  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!Array.isArray(body)) {
    return new Response("Invalid payload", { status: 400 });
  }

  const values = body.map((item) => ({
    id: crypto.randomUUID(),
    userId: user.id,

    subscriptionId: item.subscriptionId,
    subscriptionName: item.subscriptionName,

    planId: item.plan?.id,
    planName: item.plan?.name,

    price: item.plan?.price ?? 0,
    currency: item.plan?.currency ?? "ARS",
    interval: item.plan?.interval ?? "month",

    quantity: item.quantity ?? 1,
    extraMembers: item.extraMembers ?? 0,
  }));

  await db.transaction(async (tx) => {
    await tx
      .delete(userSubscription)
      .where(eq(userSubscription.userId, user.id));

    if (values.length > 0) {
      await tx.insert(userSubscription).values(values);
    }
  });

  return Response.json({ ok: true });
}
