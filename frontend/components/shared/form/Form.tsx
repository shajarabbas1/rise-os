'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PrimaryHeading, SectionHeading } from '../typography';
import Row from '../row';
import LabeledInput from './Labeled.input';
import LabeledCheckbox from './LabeledCheckBox.input';
interface IValidationRules {
  required?: string;
  [key: string]: any;
}

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  isRequired: boolean;
  validationRules: IValidationRules;
  options: any[] | null;
  rowNumber: number;
  order: number;
  formId: string;
  sectionId: string;
}

interface IFormSection {
  id: string;
  title: string;
  description: string;
  order: number;
  formId: string;
  fields: IFormField[];
}

interface IForm {
  id: string;
  name: string;
  description: string;
  categoryId: string | null;
  sections: IFormSection[];
}

const DynamicForm = ({ formData }: { formData: IForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('Form submitted with data:', data);
  };

  const renderField = (field: IFormField) => {
    const {
      id,
      name,
      label,
      type,
      placeholder,
      isRequired,
      validationRules,
      options,
    } = field;

    const baseInputClass =
      'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <LabeledInput
            labelClassName={
              'block text-sm font-medium text-gray-700 mb-1 capitalize'
            }
            errors={errors}
            label={label}
            name={name}
            type={type}
            placeHolder={placeholder}
            className={baseInputClass}
            register={register}
            validationRules={validationRules}
          />
        );

      case 'date':
      case 'time':
        return (
          <LabeledInput
            labelClassName={
              'block text-sm font-medium text-gray-700 mb-1 capitalize'
            }
            errors={errors}
            label={label}
            name={name}
            type={type}
            placeHolder={placeholder}
            className={baseInputClass}
            register={register}
            validationRules={validationRules}
          />
        );

      case 'file':
        return (
          <LabeledInput
            labelClassName={
              'block text-sm font-medium text-gray-700 mb-1 capitalize'
            }
            errors={errors}
            label={label}
            name={name}
            type={type}
            className="w-full p-2 focus:outline-none"
            placeHolder={placeholder}
            register={register}
            validationRules={validationRules}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={id}
            placeholder={placeholder}
            rows={4}
            className={baseInputClass}
            {...register(name, validationRules)}
          />
        );

      case 'select':
        return (
          <select
            id={id}
            className={baseInputClass}
            {...register(name, validationRules)}
          >
            <option value="">Select an option</option>
            {options &&
              options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        );

      case 'radio':
        return (
          <div className="flex flex-col space-y-2">
            {options &&
              options.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register(name, validationRules)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
          </div>
        );

      case 'checkbox':
        if (!options || options.length === 0) {
          return (
            <LabeledCheckbox
              className={'flex items-center space-x-2'}
              errors={errors}
              name={name}
              label={label}
              register={register}
              rules={validationRules}
            />
          );
        }

        return (
          <div className="flex flex-col space-y-2">
            {options.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  {...register(`${name}.${option.value}`, validationRules)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            className={baseInputClass}
            {...register(name, validationRules)}
          />
        );
    }
  };

  const sortedSections = [...formData.sections].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className={'max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'}>
      <PrimaryHeading title={formData.name} />
      <p className="text-gray-600 mb-6">{formData.description}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {sortedSections.map(section => {
          const sortedFields = [...section.fields].sort(
            (a, b) => a.order - b.order,
          );

          return (
            <div
              key={section.id}
              className="mb-8 p-4 border border-gray-200 rounded-md"
            >
              <SectionHeading title={section.title} />
              <p className="text-gray-600 mb-4">{section.description}</p>

              <Row className={'space-y-4 flex-wrap justify-between w-full'}>
                {sortedFields.map(field => (
                  <div key={field.id} className="form-group w-[24%]">
                    {renderField(field)}
                  </div>
                ))}
              </Row>
            </div>
          );
        })}

        <Row className={'mt-6'}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Form
          </button>
        </Row>
      </form>
    </div>
  );
};

export default DynamicForm;
