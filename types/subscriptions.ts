export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: "ARS";
  interval: "month";
  features?: string[];
  maxExtraMembers?: number;
  extraMemberPrice?: number;
};

export type Subscription = {
  id: string;
  name: string;
  slug: string;
  plans: Plan[];
};

export type SelectedSubscription = {
  subscriptionId: string;
  subscriptionName: string;
  plan: Plan;
  extraMembers: number;
  quantity: number;
};
