import React from 'react';

import { getTemplateByIdService } from '@/services/email-template';
import Row from '@/components/shared/row';
import EditEmailTemplateForm from '@/components/layout/feature/email-template/EditEmailTemplate.form';

interface IPageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: IPageProps) => {
  const { id } = await params;

  const templateData = await getTemplateByIdService(id);
  return (
    <Row className="w-full h-full flex justify-center items-center">
      <EditEmailTemplateForm templateData={templateData.data.data} />
    </Row>
  );
};

export default Page;
