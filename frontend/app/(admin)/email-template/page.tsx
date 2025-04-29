import React from 'react';

import EmailTemplateListing from '../../../components/layout/feature/email-template/TemplateListing';
import { getAllTemplatesService } from '@/services/email-template';

interface IPageProps {
  searchParams: {
    page: string;
  };
}

const Page = async ({ searchParams }: IPageProps) => {
  const { page } = await searchParams;

  if (page) {
    const response = await getAllTemplatesService(parseInt(page));

    const templateData = response.data.data;

    return <EmailTemplateListing data={templateData} />;
  }
};

export default Page;
