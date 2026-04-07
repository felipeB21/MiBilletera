"use client";

import {
  SelectedSubscription,
  Subscription,
  Plan,
} from "@/types/subscriptions";
import { createContext, useContext, useState } from "react";

type ContextType = {
  selected: SelectedSubscription[];
  addPlan: (subscription: Subscription, plan: Plan) => void;
  removePlan: (planId: string) => void;
  removeOne: (planId: string) => void;
  updateExtras: (planId: string, count: number) => void;
};

const SubscriptionContext = createContext<ContextType | null>(null);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<SelectedSubscription[]>([]);

  const addPlan = (subscription: Subscription, plan: Plan) => {
    setSelected((prev) => {
      const existing = prev.find(
        (item) =>
          item.subscriptionId === subscription.id && item.plan.id === plan.id,
      );

      if (existing) {
        return prev.map((item) =>
          item.plan.id === plan.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          subscriptionId: subscription.id,
          subscriptionName: subscription.name,
          plan,
          extraMembers: 0,
          quantity: 1,
        },
      ];
    });
  };

  const removeOne = (planId: string) => {
    setSelected((prev) =>
      prev
        .map((item) =>
          item.plan.id === planId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removePlan = (planId: string) => {
    setSelected((prev) => prev.filter((item) => item.plan.id !== planId));
  };

  const updateExtras = (planId: string, count: number) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.plan.id === planId
          ? {
              ...item,
              extraMembers: Math.min(count, item.plan.maxExtraMembers ?? 0),
            }
          : item,
      ),
    );
  };

  return (
    <SubscriptionContext.Provider
      value={{ selected, addPlan, removePlan, removeOne, updateExtras }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used inside provider");
  return ctx;
}
