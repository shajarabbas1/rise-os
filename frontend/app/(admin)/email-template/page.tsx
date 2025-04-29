import React from 'react';

import EmailTemplateListing from '../../../components/layout/feature/email-template/TemplateListing';
import {
  getAllTemplatesService,
  getTemplateByIdService,
} from '@/services/email-template';
import Row from '@/components/shared/row';
import EditEmailTemplateForm from '../../../components/layout/feature/email-template/EditEmailTemplate.form';

interface IPageProps {
  searchParams: {
    page?: string;
    id?: string;
  };
}

const Page = async ({ searchParams }: IPageProps) => {
  const { page, id } = await searchParams;

  if (id) {
    const templateData = await getTemplateByIdService(id);
    return (
      <Row className="w-full h-full flex justify-center items-center">
        <EditEmailTemplateForm data={templateData.data.data} />
      </Row>
    );
  }

  if (page) {
    const response = await getAllTemplatesService(parseInt(page));

    const templateData = response.data.data;

    return <EmailTemplateListing data={templateData} />;
  }
};

export default Page;
