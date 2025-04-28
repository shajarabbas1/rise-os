'use client';

import IconButton from '@/components/shared/button';
import LabeledInput from '@/components/shared/form/Labeled.input';
import LabeledTextarea from '@/components/shared/form/Labeled.textarea';
import Row from '@/components/shared/row';
import {
  CardDescription,
  SectionHeading,
} from '@/components/shared/typography';
import { IEmailTemplate } from '@/types/email-template.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IEditEmailTemplateFormProps {
  data: IEmailTemplate;
}

const EditEmailTemplateForm = ({ data }: IEditEmailTemplateFormProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEmailTemplate>({
    defaultValues: {
      subject: data.subject || '',
      metaData: data.metaData || '',
      htmlContent: data.htmlContent || '',
    },
  });
  console.log({data})

  const onSubmit = (data: IEmailTemplate) => {
    setIsProcessing(true);
    console.log({ data });

    setIsProcessing(false);
  };

  return (
    <Row className="w-full flex-col gap-4 p-8 items-end">
      <SectionHeading
        className="w-full text-center"
        title={`Edit Email template`}
      />

      <Row className="w-full flex-col gap-2">
        {[
          {
            name: 'subject',
            label: 'Subject of the email',
            placeHolder: 'Subject',
          },
          {
            name: 'metaData',
            label: 'Reason for sending (metadata)',
            placeHolder: 'Metadata',
          },
        ].map((item, index) => (
          <LabeledInput
            key={index}
            name={item.name}
            type="text"
            className=""
            label={item.label}
            placeHolder={item.placeHolder}
            register={register}
            errors={errors}
          />
        ))}

        <LabeledTextarea
          name={'htmlContent'}
          label={'HTML Content'}
          placeholder={'HTML content of the email'}
          rows={6}
          register={register}
          errors={errors}
        />
      </Row>

      <Row className="w-full items-center gap-2 cursor-default">
        <CardDescription
          title={data.group}
          className="bg-indigo-200  rounded-md  px-2 py-1"
        />

        {data.isSystemDefault && (
          <CardDescription
            title={'System Generated'}
            className="bg-indigo-200  rounded-md  px-2 py-1"
          />
        )}

        {data.archived && (
          <CardDescription
            title={'Not In Used'}
            className="bg-red-200  rounded-md  px-2 py-1"
          />
        )}
      </Row>

      <IconButton
        title={`${isProcessing ? 'Processing...' : 'Edit'}`}
        className={`bg-orange-400 px-4 py-1`}
        btnClassName="text-center"
        handleOnClick={handleSubmit(onSubmit)}
      />
    </Row>
  );
};

export default EditEmailTemplateForm;
