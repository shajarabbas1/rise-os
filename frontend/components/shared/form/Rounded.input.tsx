import React from 'react';
import { Controller } from 'react-hook-form';
import Row from '../row';

interface IRoundedInputProps {
  name: string;
  className?: string;
  placeHolder?: string;
  control?: any;
  rules?: any;
  errors?: any;
  type?: string;
  label?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: () => void;
  maxLength?: number;
}

const RoundedInput: React.FC<IRoundedInputProps> = ({
  name,
  className,
  placeHolder,
  control,
  rules,
  errors,
  type = 'text',
  inputRef,
  onKeyDown,
  onChange,
  maxLength = 1,
  ...restProps
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only allow numbers
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <Row className="justify-center">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            name={name}
            ref={e => {
              field.ref(e);
              if (inputRef) {
                // @ts-ignore - this is safe as we're assigning an input element
                inputRef.current = e;
              }
            }}
            maxLength={maxLength}
            className={`bg-slate-100 outline-none flex items-center justify-center text-center rounded-lg size-12 placeholder:text-[14px] placeholder:text-gray-300 ${
              errors?.[name] ? 'border-red-500' : ''
            } ${className}`}
            placeholder={placeHolder}
            type={type}
            onKeyPress={handleKeyPress}
            onKeyDown={onKeyDown}
            onChange={e => {
              field.onChange(e);
              onChange?.();
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            {...restProps}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-red-600 mt-[4px] poppinsRegular text-[12px] md:text-[14px]">
          {errors[name].message}
        </p>
      )}
    </Row>
  );
};

export default RoundedInput;
