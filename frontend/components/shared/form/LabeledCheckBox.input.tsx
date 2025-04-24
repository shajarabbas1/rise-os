import React from 'react';
import { FormLabel } from '../typography';
import Row from '../row';

interface IProps {
  name: string;
  label: string;
  control?: any;
  rules?: any;
  className?: string;
  errors?: any;
  register?: any;
}

const LabeledCheckbox: React.FC<IProps> = ({
  name,
  label,
  rules,
  register,
  className = '',
  errors,
}) => {
  return (
    <Row className={` items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register(name, rules)}
        className="size-4"
      />

      <FormLabel htmlFor={name} label={label} className="!mb-0" />

      {errors?.[name] && (
        <p className="text-red-600 mt-[4px] text-[12px]">
          {errors[name].message}
        </p>
      )}
    </Row>
  );
};

export default LabeledCheckbox;
