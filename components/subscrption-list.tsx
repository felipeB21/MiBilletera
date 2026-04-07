"use client";

import { useSubscription } from "@/context/subscription-context";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";
import {
  PlusCircleIcon,
  MinusCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

export function SubscriptionList() {
  const { selected, addPlan, removeOne } = useSubscription();

  if (selected.length === 0) return null;

  return (
    <div className=" border border-dashed">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-center">Cantidad</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {selected.map((item) => {
            const extrasCost =
              item.extraMembers * (item.plan.extraMemberPrice ?? 0);

            const unitPrice = item.plan.price + extrasCost;

            const subtotal = unitPrice * item.quantity;

            return (
              <TableRow key={item.plan.id}>
                <TableCell>
                  <div className="font-bold">
                    {item.subscriptionName} - {item.plan.name}
                  </div>

                  {item.extraMembers > 0 && (
                    <div className="text-xs text-muted-foreground">
                      + {item.extraMembers} extra(s)
                    </div>
                  )}
                </TableCell>

                <TableCell>${unitPrice.toLocaleString("es-AR")}</TableCell>

                {/* Cantidad */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOne(item.plan.id)}
                    >
                      <MinusCircleIcon size={16} />
                    </Button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        addPlan(
                          {
                            id: item.subscriptionId,
                            name: item.subscriptionName,
                            slug: "",
                            plans: [],
                          },
                          item.plan,
                        )
                      }
                    >
                      <PlusCircleIcon size={16} />
                    </Button>
                  </div>
                </TableCell>

                {/* Subtotal */}
                <TableCell className="text-right font-mono">
                  ${subtotal.toLocaleString("es-AR")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
