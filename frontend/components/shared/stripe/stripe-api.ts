// src/lib/stripe.ts
// Helper functions for Stripe
import axiosInstance from '@/services/axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const createCheckoutSession = async (
  priceId: string,
  customerId: string,
) => {
  try {
    const response = await axiosInstance.post(
      `/stripe/create-checkout-session`,
      {
        priceId,
        customerId,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const createStripeCustomer = async (email: string, name: string) => {
  try {
    const response = await axiosInstance.post(`/stripe/create-customer`, {
      email,
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
};

export const getSubscriptions = async (customerId: string) => {
  try {
    const response = await axiosInstance.get(
      `/stripe/subscriptions/${customerId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await axiosInstance.post(`/stripe/cancel-subscription`, {
      subscriptionId,
    });
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

export const updateSubscription = async (
  subscriptionId: string,
  newPriceId: string,
) => {
  try {
    const response = await axiosInstance.post(`/stripe/update-subscription`, {
      subscriptionId,
      newPriceId,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

export const createBillingPortalSession = async (customerId: string) => {
  try {
    const response = await axiosInstance.post(`/stripe/create-billing-portal`, {
      customerId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    throw error;
  }
};
