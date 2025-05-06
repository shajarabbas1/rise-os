// src/pages/account/subscriptions.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getSubscriptions,
  cancelSubscription,
  createBillingPortalSession,
} from '@/components/shared/stripe/stripe-api';
import { useSelector } from 'react-redux';

const SubscriptionsPage: React.FC = () => {
  const router = useRouter();

  const user = useSelector((state: any) => state.user);
  const loading = false;
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user?.stripeCustomerId) return;

      try {
        setIsLoading(true);
        const { subscriptions: subs } = await getSubscriptions(
          user.stripeCustomerId,
        );
        setSubscriptions(subs || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && user) {
      fetchSubscriptions();
    }
  }, [user, loading]);

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;

    try {
      setProcessing(true);
      await cancelSubscription(subscriptionId);

      // Refresh subscription list
      if (user?.stripeCustomerId) {
        const { subscriptions: subs } = await getSubscriptions(
          user.stripeCustomerId,
        );
        setSubscriptions(subs || []);
      }

      alert('Subscription canceled successfully');
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert(
        'There was an error canceling your subscription. Please try again.',
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleManageBilling = async () => {
    if (!user?.stripeCustomerId) return;

    try {
      setProcessing(true);
      const { url } = await createBillingPortalSession(user.stripeCustomerId);
      window.location.href = url;
    } catch (error) {
      console.error('Error creating billing portal session:', error);
      alert('There was an error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Subscriptions</h1>
        <p className="mt-2 text-gray-600">
          Manage your subscription plans and billing information.
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium text-gray-900">
            No Active Subscriptions
          </h2>
          <p className="mt-2 text-gray-600">
            You don't have any active subscriptions at the moment.
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Plans
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleManageBilling}
              disabled={processing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {processing ? 'Processing...' : 'Manage Billing'}
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {subscriptions.map(subscription => {
                const endDate = new Date(
                  subscription.current_period_end * 1000,
                );
                const formattedEndDate = endDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <li key={subscription.id}>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium text-gray-900">
                            {subscription.plan.nickname || 'Subscription'}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Status:{' '}
                            <span className="font-medium capitalize">
                              {subscription.status}
                            </span>
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {subscription.cancel_at_period_end
                              ? `Cancels on ${formattedEndDate}`
                              : `Renews on ${formattedEndDate}`}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            ${(subscription.plan.amount / 100).toFixed(2)} /{' '}
                            {subscription.plan.interval}
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                          <button
                            onClick={() => handleManageBilling()}
                            disabled={processing}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Update
                          </button>
                          <button
                            onClick={() =>
                              handleCancelSubscription(subscription.id)
                            }
                            disabled={
                              processing || subscription.cancel_at_period_end
                            }
                            className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                              subscription.cancel_at_period_end
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            }`}
                          >
                            {subscription.cancel_at_period_end
                              ? 'Cancellation Pending'
                              : 'Cancel'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionsPage;
