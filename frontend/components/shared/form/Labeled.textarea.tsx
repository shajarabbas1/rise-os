import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import { FormLabel } from '../typography';

interface CustomTextareaProps {
  name: string;
  id?: string;
  register?: any;
  errors?: any;
  label?: string;
  placeholder?: string;
  rows?: number;
  validationRules?: RegisterOptions;
  className?: string;
}

const LabeledTextarea: React.FC<CustomTextareaProps> = ({
  name,
  id,
  label,
  register,
  errors,
  placeholder = '',
  rows = 4,
  validationRules = {},
  className = '',
}) => {
  const baseInputClass =
    'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  const errorClass = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className="mb-4">
      {label && <FormLabel htmlFor={name} label={label} />}

      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        className={`${baseInputClass} ${errors[name] ? errorClass : ''} ${className}`}
        {...register(name, validationRules)}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default LabeledTextarea;
