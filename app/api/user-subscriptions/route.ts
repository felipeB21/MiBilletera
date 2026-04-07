import { db } from "@/db";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth-server";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .select()
    .from(userSubscription)
    .where(eq(userSubscription.userId, user.id));

  const formatted = data.map((item) => ({
    subscriptionId: item.subscriptionId,
    subscriptionName: item.subscriptionName,
    plan: {
      id: item.planId,
      name: item.planName,
      price: item.price,
      currency: item.currency,
      interval: item.interval,
    },
    quantity: item.quantity,
    extraMembers: item.extraMembers,
  }));

  return Response.json(formatted);
}
