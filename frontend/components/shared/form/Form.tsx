'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { CardDescription, PrimaryHeading, SectionHeading } from '../typography';
import Row from '../row';
import LabeledInput from './Labeled.input';
import LabeledCheckbox from './LabeledCheckBox.input';
import CustomFileDropdown from './Custom.dropdown';
import { IForm, IFormField } from '../../../types/form.types';
import IconButton from '../button';
import CustomRadioGroup from './Labeled.radio';
import CustomSelect from './Labeled.select';
import CustomTextarea from './Labeled.textarea';
const DynamicForm = ({ formData }: { formData: IForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
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
          <CustomTextarea name={name} id={id} label={label} placeholder={placeholder} rows={4} validationRules={validationRules} className={baseInputClass} register={register} errors={errors}/>
        );

      case 'select':
        return (
          options && (
            <CustomSelect
              id={id}
              options={options}
              name={name}
              label={label}
              validationRules={validationRules}
              register={register}
              errors={errors}
            />
          )
        );

      case 'radio':
        return (
          <Row className="flex flex-col space-y-2">
            {options && (
              <CustomRadioGroup
                options={options}
                name={name}
                label={label}
                register={register}
                errors={errors}
                validationRules={validationRules}
              />
            )}
          </Row>
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
          <Row className="flex flex-col space-y-2">
            {options.map(option => (
              <LabeledCheckbox
                key={option.value}
                className={'flex items-center space-x-2'}
                errors={errors}
                name={`${name}.${option.value}`}
                label={option.label}
                register={register}
                rules={validationRules}
              />
            ))}
          </Row>
        );

      default:
        return null;
    }
  };

  return (
    <div className={'max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'}>
      <PrimaryHeading title={formData.name} />
      <CardDescription
        className="text-gray-600 mb-6"
        title={formData.description}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData.sections.map(section => {
          const sortedFields = [...section.fields].sort(
            (a, b) => a.order - b.order,
          );

          return (
            <div
              key={section.id}
              className="mb-8 p-4 border border-gray-200 rounded-md"
            >
              <SectionHeading title={section.title} />
              <CardDescription
                className="text-gray-600 mb-4"
                title={section.description}
              />

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
          <IconButton
            handleOnClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Submit"
          />
        </Row>
      </form>
    </div>
  );
};

export default DynamicForm;
