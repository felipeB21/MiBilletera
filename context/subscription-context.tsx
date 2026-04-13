"use client";

import {
  SelectedSubscription,
  Subscription,
  Plan,
} from "@/types/subscriptions";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

type ContextType = {
  selected: SelectedSubscription[];
  isLoading: boolean;
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
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const [isLoading, setIsLoading] = useState(true);

  const [selected, setSelected] = useState<SelectedSubscription[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("subscriptions");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const hasInitialized = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSessionLoading) return;

    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    if (hasInitialized.current) return;

    hasInitialized.current = true;

    async function init() {
      setIsLoading(true);
      try {
        const stored = localStorage.getItem("subscriptions");

        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0) {
            await fetch("/api/user-subscriptions/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: stored,
            });
          }
          localStorage.removeItem("subscriptions");
        }

        const res = await fetch("/api/user-subscriptions");
        const data = await res.json();
        setSelected(data);
      } catch {
        setSelected([]);
        console.error("Failed to fetch subscriptions");
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [session, isSessionLoading]);

  useEffect(() => {
    if (session?.user) return;
    try {
      localStorage.setItem("subscriptions", JSON.stringify(selected));
    } catch {}
  }, [selected, session]);

  useEffect(() => {
    if (!session?.user || !hasInitialized.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetch("/api/user-subscriptions/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
    }, 300);
  }, [selected, session]);

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
      value={{
        selected,
        isLoading,
        addPlan,
        removePlan,
        removeOne,
        updateExtras,
      }}
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
