// src/stripe/interfaces/payment-intent.interface.ts
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}
