// src/pages/pricing.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/components/shared/stripe/stripe-api';
import { PricingPlan } from '@/types/stripe';
// import { useAuth } from '@/hooks/useAuth'; // Assume you have some auth hook
import {
  createBillingPortalSession,
  createStripeCustomer,
  getSubscriptions,
} from '@/components/shared/stripe/stripe-api';

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    interval: 'month',
    currency: 'USD',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    stripePriceId: 'price_1RLK6uSJeIpJTOugJHeuejZQ', // Replace with your actual Stripe price ID
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 19.99,
    interval: 'month',
    currency: 'USD',
    features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
    stripePriceId: 'price_1RLK6uSJeIpJTOugJHeuejZQ', // Replace with your actual Stripe price ID
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 500,
    interval: 'month',
    currency: 'USD',
    features: [
      'All Pro features',
      'Feature 7',
      'Feature 8',
      'Feature 9',
      'Priority Support',
    ],
    stripePriceId: 'price_1RLK6uSJeIpJTOugJHeuejZQ', // Replace with your actual Stripe price ID
  },
];

const PricingPage: React.FC = () => {
  const router = useRouter();
  // const { user, loading } = useAuth();
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'BZ4oq@example.com',
    stripeCustomerId: 'cus_1234567890',
    subscriptionId: 'sub_1234567890',
    subscriptionStatus: 'false',
    isPremium: true,
  };
  const loading = false;
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (user?.stripeCustomerId) {
        try {
          const { subscriptions } = await getSubscriptions(
            user.stripeCustomerId,
          );
          if (subscriptions && subscriptions.length > 0) {
            setActiveSubscription(subscriptions[0]);
          }
        } catch (error) {
          console.error('Error fetching subscription data:', error);
        }
      }
    };

    if (!loading && user) {
      fetchSubscriptionData();
    }
  }, [user, loading]);

  const handleSubscribe = async (plan: PricingPlan) => {
    try {
      setProcessingPlan(plan.id);

      if (!user) {
        // Redirect to login if not authenticated
        router.push(`/login?redirect=${encodeURIComponent('/pricing')}`);
        return;
      }

      // Ensure user has a Stripe customer ID
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customerData = await createStripeCustomer(user.email, user.name);
        customerId = customerData.customerId;
        // You should update your user record with this customer ID
      }

      // Create checkout session
      const { url } = await createCheckoutSession(
        plan.stripePriceId,
        customerId,
      );

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      alert(
        'There was an error processing your subscription. Please try again.',
      );
    } finally {
      setProcessingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user?.stripeCustomerId) return;

    try {
      const { url } = await createBillingPortalSession(user.stripeCustomerId);
      window.location.href = url;
    } catch (error) {
      console.error('Error creating billing portal session:', error);
      alert('There was an error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Choose Your Plan
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
          Select the perfect plan for your needs with our flexible subscription
          options.
        </p>
      </div>

      {activeSubscription && (
        <div className="mt-12 text-center bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">
            You're currently subscribed to a plan
          </h2>
          <p className="mt-2 text-blue-600">
            Manage your subscription settings, billing information, or cancel
            your plan.
          </p>
          <button
            onClick={handleManageSubscription}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Subscription
          </button>
        </div>
      )}

      <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        {pricingPlans.map(plan => (
          <div
            key={plan.id}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${plan.price}
                </span>
                <span className="ml-1 text-xl font-semibold">
                  /{plan.interval}
                </span>
              </p>
              <ul className="mt-6 space-y-6">
                {plan.features.map(feature => (
                  <li key={feature} className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={
                processingPlan === plan.id ||
                (activeSubscription &&
                  activeSubscription.plan.product ===
                    plan.stripePriceId.split('_')[1])
              }
              className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md 
                        text-center font-medium ${
                          processingPlan === plan.id
                            ? 'bg-gray-300 cursor-not-allowed'
                            : activeSubscription &&
                                activeSubscription.plan.product ===
                                  plan.stripePriceId.split('_')[1]
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
            >
              {processingPlan === plan.id
                ? 'Processing...'
                : activeSubscription &&
                    activeSubscription.plan.product ===
                      plan.stripePriceId.split('_')[1]
                  ? 'Current Plan'
                  : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
