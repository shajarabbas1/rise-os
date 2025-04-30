'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { CardDescription, CardHeading, SectionHeading } from '../typography';
import Row from '../row';
import LabeledInput from './Labeled.input';
import LabeledCheckbox from './LabeledCheckBox.input';
import CustomFileDropdown from './Custom.dropdown';
import { IForm } from '../../../types/form.types';
import IconButton from '../button';
import CustomRadioGroup from './Labeled.radio';
import CustomSelect from './Labeled.select';
import LabeledTextarea from './Labeled.textarea';
import { TbDownload } from 'react-icons/tb';

const DynamicForm = ({ formData }: { formData: IForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
  };

  const renderField = (field: any) => {
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
      'w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <LabeledInput
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
          <LabeledTextarea
            name={name}
            id={id}
            label={label}
            placeholder={placeholder}
            rows={4}
            validationRules={validationRules}
            className={baseInputClass}
            register={register}
            errors={errors}
          />
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
            {options.map((option: any) => (
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
    <Row className="w-full justify-center py-6 bg-white">
      <Row
        className={
          'flex-col w-[85%] p-6 bg-slate-100 rounded-lg shadow-lg items-end relative'
        }
      >
        <IconButton
          title="Download Form"
          className="bg-indigo-600 text-white px-4 py-1 !gap-0 absolute"
          Icon={TbDownload}
          iconColor="text-white"
        />

        <SectionHeading className="w-full text-center" title={formData.name} />

        <CardDescription
          className="w-full text-center mb-4"
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
                className="mb-3 p-4 bg-orange-50 rounded-md border border-slate-300"
              >
                <CardHeading title={section.title} className="capitalize" />

                <CardDescription
                  className="text-gray-600 mt-1 mb-2 "
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

          <Row className={'mt-3 justify-end'}>
            <IconButton
              handleOnClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Submit"
            />
          </Row>
        </form>
      </Row>
    </Row>
  );
};

export default DynamicForm;
