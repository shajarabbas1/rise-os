// CustomRadioGroup.tsx
import React from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
export interface Option {
  value: string;
  label: string;
}

interface CustomRadioGroupProps {
  name: string;
  label?: string;
  value?: string;
  register?: any;
  errors?: any;
  options?: Option[];
  validationRules?: RegisterOptions;
  className?: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  name,
  label,
  errors,
  register,
  options = [],
  validationRules = {},
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <p className="block mb-2 font-medium text-gray-700">{label}</p>}

      <div className="space-y-2">
        {options.map(option => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              className="text-blue-600 focus:ring-blue-500"
              {...register(name, validationRules)}
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomRadioGroup;
