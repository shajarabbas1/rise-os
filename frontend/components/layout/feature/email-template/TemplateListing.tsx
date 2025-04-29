'use client';
import React, { useState } from 'react';
import {
  CardDescription,
  CardHeading,
  SectionHeading,
} from '@/components/shared/typography';
import Row from '@/components/shared/row';
import EmailTemplateCard from '@/components/shared/cards/EmailTemplate.card';
import { useRouter } from 'next/navigation';
import EmailTemplateModal from '@/components/shared/modals/EmailTemplate.modal';
import { IEmailTemplate } from '@/types/email-template.type';
import ConfirmationModal from '@/components/shared/modals/Confirmation.modal';
import ReactIcon from '@/components/shared/react-icon';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import { delTemplateByIdService } from '@/services/email-template';
import { toast } from 'react-toastify';

interface IEmailTemplateListingProps {
  data: {
    items: IEmailTemplate[] | [];
    pageInfo: {
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

const EmailTemplateListing: React.FC<IEmailTemplateListingProps> = ({
  data,
}) => {
  const router = useRouter();
  const currentPage = data.pageInfo.currentPage;
  const [showViewModal, setShowViewModal] = useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<IEmailTemplate | null>(null);

  const toggleConfirmationModal = () =>
    setShowConfirmationModal(!showConfirmationModal);

  const toggleViewModal = (data: IEmailTemplate) => {
    setShowViewModal(!showViewModal);
    setSelectedTemplate(data);
  };

  const onDeleteClick = (data: IEmailTemplate) => {
    setSelectedTemplate(data);
    toggleConfirmationModal();
  };

  const handleDeleteTemplate = async () => {
    if (selectedTemplate) {
      const response = await delTemplateByIdService(selectedTemplate?.id);

      if (response.data.data) {
        toast.success(response.data.message);
        toggleConfirmationModal();
        router.refresh(); // 🔄 Refresh the current page to show updated data
      }

      toggleConfirmationModal();
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`${PAGES_ROUTES.emailTemplate}?page=${newPage}`);
  };

  return (
    <Row className="p-6 flex-col items-end">
      <SectionHeading
        title={'Email Templates'}
        className="w-full text-center"
      />

      <Row className="w-full items-center justify-between my-2 p-2 bg-slate-50 border rounded-md">
        {[
          { title: 'Subject', className: 'w-[50%] lg:w-[60%] text-start' },
          { title: 'Group', className: 'w-[16%] border-x' },
          { title: 'Archived', className: 'w-[12%] lg:w-[10%] border-r' },
          { title: 'Actions', className: 'w-[10%] lg:w-[8%]' },
        ].map(item => (
          <CardHeading
            key={item.title}
            title={item.title}
            className={`text-center ${item.className}`}
          />
        ))}
      </Row>

      <Row className="w-full flex-col gap-2 items-center justify-between">
        {data?.items?.map((item, index) => (
          <EmailTemplateCard
            key={item.id}
            subject={item.subject}
            group={item.group}
            archived={item.archived}
            isSystemDefault={item.isSystemDefault}
            constainerClassName={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}`}
            handleViewClick={() => toggleViewModal(item)}
            handleEditClick={() =>
              router.push(`${PAGES_ROUTES.emailTemplate}?id=${item.id}`)
            }
            handleDeleteClick={() => onDeleteClick(item)}
          />
        ))}
      </Row>

      <Row className="w-full items-center justify-between gap-2 mt-4">
        <Row className="gap-2 items-center">
          {[
            { title: 'Total Records : ' },
            { title: data.pageInfo.totalItems },
          ].map((item, index) => (
            <CardHeading key={index} title={item.title} />
          ))}
        </Row>

        {/* page navigation */}
        <Row className="gap-2 items-center">
          <ReactIcon
            Icon={GrFormPrevious}
            className={` ${currentPage <= 1 ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />

          <CardDescription
            title={`${currentPage}/${data.pageInfo.totalPages}`}
            className=" bg-slate-100 px-4 py-2 rounded-sm border-[1px] border-gray-400 cursor-none"
          />

          <ReactIcon
            Icon={MdOutlineNavigateNext}
            className={` ${currentPage >= data.pageInfo.totalPages ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() =>
              currentPage < data.pageInfo.totalPages &&
              handlePageChange(currentPage + 1)
            }
          />
        </Row>
      </Row>

      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleDeleteTemplate}
          onCancel={toggleConfirmationModal}
        />
      )}

      {showViewModal && selectedTemplate && (
        <EmailTemplateModal
          onCancel={() => setShowViewModal(!showViewModal)}
          templateData={selectedTemplate}
        />
      )}
    </Row>
  );
};

export default EmailTemplateListing;
