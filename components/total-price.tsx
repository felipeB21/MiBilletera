"use client";

import { useSubscription } from "@/context/subscription-context";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { arsToUsd } from "@/lib/currency";

export default function TotalPrice({ rate }: { rate: number }) {
  const { selected, isLoading } = useSubscription();

  const totalARS = selected.reduce((acc, item) => {
    const extrasCost = item.extraMembers * (item.plan.extraMemberPrice ?? 0);
    const subtotal = item.plan.price + extrasCost;
    return acc + subtotal * item.quantity;
  }, 0);

  const totalUSD = arsToUsd(totalARS, rate);

  const animatedARS = useAnimatedNumber(totalARS, 400);
  const animatedUSD = useAnimatedNumber(totalUSD, 400);

  const totalSubscriptions = selected.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div>
      <h2 className="text-xl font-heading">Total</h2>

      {isLoading ? (
        <div className="py-1 flex flex-col gap-2 my-1">
          <div className="h-18 w-64 max-w-full animate-pulse rounded-md bg-muted" />
          <div className="h-7 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      ) : (
        <>
          <h1 className="font-heading text-7xl py-1">
            ARS ${animatedARS.toLocaleString("es-AR")}
          </h1>

          <p className="text-lg font-mono text-muted-foreground">
            USD ${animatedUSD.toFixed(2)}
          </p>
        </>
      )}

      <p className="text-xs font-mono mt-1">Dólar: ${rate}</p>

      <p className="text-xs font-mono mt-2">
        {isLoading
          ? "Calculando suscripciones..."
          : totalSubscriptions === 0
            ? "Agregá tus suscripciones para ver el total mensual"
            : `${totalSubscriptions} suscripción(es) activas`}
      </p>
    </div>
  );
}
