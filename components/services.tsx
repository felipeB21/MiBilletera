"use client";

import { useEffect, useState } from "react";
import { Subscription } from "@/types/subscriptions";
import { useSubscription } from "@/context/subscription-context";
import {
  PlusCircleIcon,
  MinusCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Services() {
  const [services, setServices] = useState<Subscription[]>([]);
  const [query, setQuery] = useState("");

  const { addPlan, removeOne, selected } = useSubscription();

  useEffect(() => {
    Promise.all([
      fetch("/api/subscriptions/netflix").then((r) => r.json()),
      fetch("/api/subscriptions/spotify").then((r) => r.json()),
    ]).then((data) => setServices(data));
  }, []);

  const getQuantity = (planId: string) => {
    return selected.find((item) => item.plan.id === planId)?.quantity || 0;
  };

  const filteredServices = services
    .map((service) => ({
      ...service,
      plans: service.plans.filter((plan) =>
        `${service.name} ${plan.name}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    }))
    .filter((service) => service.plans.length > 0);

  return (
    <div className="border border-dashed">
      <Input
        placeholder="Buscar servicio..."
        className="border-none bg-accent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredServices.map((service) =>
            service.plans.map((plan) => {
              const quantity = getQuantity(plan.id);

              return (
                <TableRow key={`${service.id}-${plan.id}`}>
                  <TableCell className="font-bold">
                    {service.name} - {plan.name}
                  </TableCell>

                  <TableCell>${plan.price.toLocaleString("es-AR")}</TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    {quantity > 0 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOne(plan.id)}
                        >
                          <MinusCircleIcon size={18} />
                        </Button>

                        <span className="w-6 text-center">{quantity}</span>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addPlan(service, plan)}
                    >
                      <PlusCircleIcon size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
