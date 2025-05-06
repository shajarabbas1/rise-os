import { useState } from 'react';
import { Check, CreditCard } from 'lucide-react';

// Define types
const planTypes = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    interval: 'month',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 19.99,
    interval: 'month',
    features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 49.99,
    interval: 'month',
    features: [
      'All Pro features',
      'Feature 7',
      'Feature 8',
      'Feature 9',
      'Priority Support',
    ],
    popular: false,
  },
];

// SubscriptionDemo component
export default function SubscriptionDemo() {
  const [billingInterval, setBillingInterval] = useState('month');
  const [selectedPlan, setSelectedPlan] = useState(planTypes[1].id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = planId => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Subscribing to ${selectedPlan} plan with ${billingInterval}ly billing`,
      );
    }, 1500);
  };

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
      {/* Billing interval toggle */}
      <div className="flex justify-center mb-8">
        <div className="relative bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setBillingInterval('month')}
            className={`${
              billingInterval === 'month'
                ? 'bg-white border-gray-200 shadow-sm text-gray-800'
                : 'text-gray-500'
            } relative w-24 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`${
              billingInterval === 'year'
                ? 'bg-white border-gray-200 shadow-sm text-gray-800'
                : 'text-gray-500'
            } ml-0.5 relative w-24 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10`}
          >
            Yearly
            <span className="absolute -top-2 -right-12 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planTypes.map(plan => {
          const isSelected = selectedPlan === plan.id;
          const price =
            billingInterval === 'year'
              ? (plan.price * 12 * 0.8).toFixed(2)
              : plan.price.toFixed(2);

          return (
            <div
              key={plan.id}
              className={`relative rounded-lg shadow-md overflow-hidden cursor-pointer transition-all
                ${
                  isSelected
                    ? 'border-2 border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                    : 'border border-gray-200'
                } bg-white`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 transform translate-x-5 translate-y-2 rotate-45">
                  Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${price}
                  </span>
                  <span className="ml-1 text-xl text-gray-500">
                    /{billingInterval}
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <Check
                        size={18}
                        className="mt-1 text-green-500 flex-shrink-0"
                      />
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="absolute top-6 right-6">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscribe button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <CreditCard size={20} className="mr-2" />
              Subscribe Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
