import React from 'react';
import { Controller } from 'react-hook-form';
import { FormLabel } from '../typography';
import Row from '../row';

interface IProps {
  name: string;
  label: string;
  control: any;
  rules?: any;
  className?: string;
  errors?: any;
}

const LabeledCheckbox: React.FC<IProps> = ({
  name,
  label,
  control,
  rules,
  className = '',
  errors,
}) => {
  return (
    <Row className={` items-center space-x-2 ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            type="checkbox"
            id={name}
            {...field}
            checked={field.value || false}
            className="size-4"
          />
        )}
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
