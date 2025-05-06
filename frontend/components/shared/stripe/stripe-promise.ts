import { loadStripe } from '@stripe/stripe-js';

export const getStripe = async () => {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  const stripePromise = loadStripe(stripePublishableKey);
  return stripePromise;
};
