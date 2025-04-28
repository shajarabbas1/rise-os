'use client';
import React, { useState } from 'react';
import { emailTemplateData } from '@/data/email-temlate.data';
import {
  CardDescription,
  CardHeading,
  SectionHeading,
} from '@/components/shared/typography';
import Row from '@/components/shared/row';
import EmailTemplateCard from '@/components/shared/cards/EmailTemplate.card';
import { useRouter } from 'next/navigation';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import EmailTemplateModal from '@/components/shared/modals/EmailTemplate.modal';
import { IEmailTemplate } from '@/types/email-template.type';
import ConfirmationModal from '@/components/shared/modals/Confirmation.modal';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import ReactIcon from '@/components/shared/react-icon';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleDeleteTemplate = () => toggleConfirmationModal();

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
        {emailTemplateData.map((item, index) => (
          <EmailTemplateCard
            key={item.id}
            subject={item.subject}
            group={item.group}
            archived={item.archived}
            constainerClassName={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}`}
            handleViewClick={() => toggleViewModal(item)}
            handleEditClick={() =>
              router.push(`${PAGES_ROUTES.emailTemplate}/${item.id}`)
            }
            handleDeleteClick={() => onDeleteClick(item)}
          />
        ))}
      </Row>

      <Row className="w-full items-center justify-between gap-2 mt-4">
        {/* total pages */}
        <Row className="gap-2 items-center">
          <CardDescription title={'Total Pages'} />
          <CardHeading title={'10'} />
        </Row>

        {/* page navigation */}
        <Row className="gap-2 items-center">
          <ReactIcon
            Icon={GrFormPrevious}
            className={` ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          />

          <CircleCard
            count={currentPage}
            className=" bg-slate-100  size-[40px] cursor-none"
          />

          <ReactIcon
            Icon={MdOutlineNavigateNext}
            className="cursor-pointer"
            onClick={() => setCurrentPage(currentPage + 1)}
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

export default Page;
