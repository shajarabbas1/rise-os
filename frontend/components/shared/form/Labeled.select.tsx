import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import { FormLabel } from '../typography';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  id: string;
  label?: string;
  errors?: any;
  register?: any;
  options?: Option[];
  validationRules?: RegisterOptions;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  id,
  label,
  errors,
  register,
  options = [],
  validationRules = {},
  placeholder = 'Select an option',
  className = '',
  labelClassName,
}) => {
  const baseInputClass =
    'w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  const errorClass = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className="mb-4">
      {label && (
        <FormLabel htmlFor={id} label={label} className={`${labelClassName}`} />
      )}

      <select
        id={id}
        className={`${baseInputClass} ${errors[name] ? errorClass : ''} ${className}`}
        {...register(name, validationRules)}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
