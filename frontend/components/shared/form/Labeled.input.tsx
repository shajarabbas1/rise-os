import React from 'react';
import { Controller } from 'react-hook-form';
import Row from '../row';
import { FormLabel } from '../typography';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface ILabeledInputProps {
  name: string;
  className?: string;
  placeHolder?: string;
  control?: any;
  rules?: any;
  errors?: any;
  type?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
  showErrors?: boolean;
}

const LabeledInput: React.FC<ILabeledInputProps> = ({
  name,
  className,
  placeHolder,
  control,
  rules,
  errors,
  type = 'text',
  label,
  labelClassName,
  containerClassName,
  value = null,
  onChange,
  showErrors = true,
  ...restProps
}) => {
  return (
    <Row className={`flex-col w-full mb-[16px] ${containerClassName}`}>
      {label && (
        <FormLabel htmlFor={name} label={label} className={labelClassName} />
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            name={name}
            value={value || field.value}
            className={`w-full outline-slate-500 pt-[10px] pb-[9px] px-[17px] bg-slate-100  placeholder:text-gray-300 ${inter.className} ${className}`}
            placeholder={placeHolder}
            type={type}
            onChange={e => {
              field.onChange(e); // Call the field's onChange from react-hook-form
              if (onChange) onChange(e); // Call the onChange passed as prop if it's provided
            }}
            {...restProps}
          />
        )}
      />
      {showErrors && errors?.[name] && (
        <p className={`text-red-600 mt-[4px] ${inter.className}`}>
          {errors[name].message}
        </p>
      )}
    </Row>
  );
};

export default LabeledInput;
