'use client';
import React from 'react';
import { emailTemplateData } from '@/data/email-temlate.data';
import { IEmailTemplate } from '@/types/email-template.type';
import { useRouter } from 'next/navigation';
import {
  CardDescription,
  PrimaryHeading,
} from '@/components/shared/typography';
import Row from '@/components/shared/row';
import IconButton from '@/components/shared/button';

const EmailTemplateRow = ({ template }: { template: IEmailTemplate }) => {
  const router = useRouter();
  const handleDelete = () => {};

  const handleView = () => {};

  const handleEdit = () => {
    router.push(`/email-template/${template.id}`);
  };

  return (
    <Row className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Row className="flex-1">
        <PrimaryHeading
          className="text-lg font-semibold text-gray-800"
          title={template.subject}
        />
        <CardDescription
          className="text-sm text-gray-600"
          title={template.group}
        />
        <p className="text-sm text-gray-600">
          Status: {template.archived ? 'Archived' : 'Active'}
        </p>
      </Row>
      <Row className="flex space-x-2">
        <IconButton
          handleOnClick={handleDelete}
          className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          title="Delete"
        />

        <IconButton
          handleOnClick={handleView}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          title="View"
        />
        <IconButton
          handleOnClick={handleEdit}
          className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
          title="Edit"
        />
      </Row>
    </Row>
  );
};

const EmailTemplateForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <PrimaryHeading
          className="text-3xl font-bold text-gray-800 mb-6"
          title={'Email Templates'}
        />
        <div className="space-y-4">
          {emailTemplateData.map(template => (
            <EmailTemplateRow key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateForm;
