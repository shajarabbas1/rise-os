// src/pages/subscription/canceled.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const SubscriptionCanceledPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-md">
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Subscription Canceled</h1>
        <p className="text-gray-600 mb-6">
          You've canceled the subscription process. No charges have been made.
        </p>

        <div className="space-y-4">
          <Link href="/pricing">
            <a className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Return to Pricing
            </a>
          </Link>

          <Link href="/">
            <a className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
              Go to Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCanceledPage;
