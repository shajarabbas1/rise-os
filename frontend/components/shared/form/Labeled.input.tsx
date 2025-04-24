import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Row from '../row';
import { FormLabel } from '../typography';
const inter = Inter({ subsets: ['latin'] });

interface ILabeledInputProps {
  name: string;
  className?: string;
  placeHolder?: string;
  validationRules?: any;
  type: string;
  register?: any;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  errors?: any;
  showErrors?: boolean;
  startData?: any;
  endData?: any;
}

const LabeledInput: React.FC<ILabeledInputProps> = ({
  name,
  className,
  placeHolder,
  type,
  validationRules,
  register,
  label,
  labelClassName,
  containerClassName,
  errors,
  startData,
  endData,
  showErrors = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <Row className={`flex-col w-full mb-[16px] ${containerClassName}`}>
      {label && (
        <FormLabel htmlFor={name} label={label} className={labelClassName} />
      )}
      <div className="w-full relative">
        <input
          id={name}
          name={name}
          startData={startData}
          endData={endData}
          className={`w-full outline-slate-500 pt-[10px] pb-[9px] px-[17px] bg-slate-100  placeholder:text-gray-300 ${inter.className} ${className}`}
          placeholder={placeHolder}
          {...register(name, validationRules)}
          type={isPassword && !showPassword ? 'password' : type}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        )}
      </div>
      {showErrors && errors?.[name] && (
        <p className={`text-red-600 mt-[4px] ${inter.className}`}>
          {errors[name].message}
        </p>
      )}
    </Row>
  );
};

export default LabeledInput;
