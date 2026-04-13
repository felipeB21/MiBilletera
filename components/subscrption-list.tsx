"use client";

import { useSyncExternalStore } from "react";
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

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function SubscriptionList() {
  const { selected, isLoading, removeOne, addPlan } = useSubscription();

  const isClient = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!isClient || isLoading) return null;
  if (selected.length === 0) return null;

  return (
    <div className=" border border-dashed">
      <h2 className="p-2 font-heading font-bold">Tus suscripciónes</h2>
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
          {selected.map((item, index) => {
            const extrasCost =
              item.extraMembers * (item.plan.extraMemberPrice ?? 0);

            const unitPrice = item.plan.price + extrasCost;

            const subtotal = unitPrice * item.quantity;

            return (
              <TableRow key={index}>
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
