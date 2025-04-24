'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { PrimaryHeading, SectionHeading } from '../typography';
import Row from '../row';
import LabeledInput from './Labeled.input';
import LabeledCheckbox from './LabeledCheckBox.input';
import CustomFileDropdown from './Custom.dropdown';
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
    const files = [
      'https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      'https://images.unsplash.com/photo-1602679042292-0679c2663d07?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://www.africau.edu/images/default/sample.pdf',
    ];

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
        return (
          <LabeledInput
            labelClassName={
              'block text-sm font-medium text-gray-700 mb-1 capitalize'
            }
            errors={errors}
            label={label}
            name={name}
            type={type}
            startDate={new Date()}
            endDate={new Date(Date.now()) * 30 * 24 * 60 * 60 * 1000}
            placeHolder={placeholder}
            className={baseInputClass}
            register={register}
            validationRules={validationRules}
          />
        );
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
          <div>
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
            <CustomFileDropdown files={files} />
          </div>
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
