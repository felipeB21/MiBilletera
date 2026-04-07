"use client";

import { useSubscription } from "@/context/subscription-context";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { arsToUsd } from "@/lib/currency";

export default function TotalPrice() {
  const { selected } = useSubscription();
  const rate = useExchangeRate();

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

      <h1 className="font-heading text-7xl py-1">
        ARS ${animatedARS.toLocaleString("es-AR")}
      </h1>

      <p className="text-lg font-mono text-muted-foreground">
        USD ${animatedUSD.toFixed(2)}
      </p>

      <p className="text-xs font-mono mt-1">
        {rate ? `Dólar: $${rate}` : "Cargando cotización..."}
      </p>

      <p className="text-xs font-mono mt-2">
        {totalSubscriptions === 0
          ? "Agregá tus suscripciones para ver el total mensual"
          : `${totalSubscriptions} suscripción(es) activas`}
      </p>
    </div>
  );
}
