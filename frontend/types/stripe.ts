// types/stripe.ts
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  currency: string;
  features: string[];
  stripePriceId: string;
}
