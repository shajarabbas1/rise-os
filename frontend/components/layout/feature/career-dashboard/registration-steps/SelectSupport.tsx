import CategoryCard from '@/components/shared/cards/Category.card';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import VideoTutorialModal from '@/components/shared/modals/VideoTutorial.modal';
import Row from '@/components/shared/row';
import { CardHeading } from '@/components/shared/typography';
import { useCallback, useState } from 'react';
import WatchVideo from '../WatchVideo';
import IconButton from '@/components/shared/button';
import { RegistrationStepsFlow } from '.';

const SelectSupport: React.FC<{ handleNextStep: any }> = ({
  handleNextStep,
}) => {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  /**
   * We're using useCallback here to memoize the toggleVideoModal function.
   * This ensures that the function reference stays stable across re-renders.
   * It's important because we're passing this function as a prop to the WatchVideo component.
   * Combined with React.memo in the child, this avoids unnecessary re-renders of WatchVideo.
   */

  const toggleVideoModal = useCallback(() => {
    setShowVideoModal(prev => !prev);
  }, []);

  const stepHeading = 'Which type of support services will you provide?';

  return (
    <Row className="w-full bg-white p-4 rounded-2xl gap-4 flex-col items-end">
      {showVideoModal && (
        <VideoTutorialModal
          heading={stepHeading}
          onCancel={toggleVideoModal}
          stepNumber={1}
        />
      )}

      <Row className="w-full justify-between items-center">
        <CircleCard count={1} className="size-[40px]" />
        <WatchVideo
          title="Watch Video"
          className="justify-end"
          imgURL="https://images.unsplash.com/photo-1726179612723-124312ff97a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          handleOnClick={toggleVideoModal}
        />
      </Row>

      <CardHeading title={stepHeading} className="w-full" />

      <Row className="w-full flex-wrap justify-between">
        {[
          {
            title: 'Daily Living Assistance',
            description:
              'Support with everyday personal activities, household tasks, and shared living arrangements.',
            tags: ['Personal Care', 'Household Tasks', 'Shared Living'],
          },
          {
            title: 'Assistive Tech & Access',
            description:
              'Equipment and modifications to improve mobility, and home accessibility for greater independence.',
            tags: [
              'Mobility Aids',
              'Communication Devices',
              'Home Modifications',
            ],
          },
          {
            title: 'Health & Therapy',
            description:
              'Therapies like physiotherapy and behavior therapy to improve well-being and independence.',
            tags: [
              'Physiotherapy',
              'Occupational Therapy',
              'Behavioral Therapy',
            ],
          },

          {
            title: 'Plan Management',
            description:
              'Assistance with managing NDIS funding, budgeting, and coordinating services to optimize resources.',
            tags: [
              'NDIS Budgeting',
              'Fund Management',
              'Services Coordination',
            ],
          },
          {
            title: 'Other (Specify)',
            description:
              "If your services don't align with the listed categories, please specify them here for accurate registration.",
            tags: ['Custom Support', 'Specialized Support', 'Additional Needs'],
          },
        ].map((item, index) => (
          <CategoryCard
            key={index}
            description={item.description}
            title={item.title}
            tags={item.tags}
            containerClassName="w-[19%]"
          />
        ))}
      </Row>

      <IconButton
        title="Next"
        className="bg-orange-300"
        handleOnClick={() =>
          handleNextStep(RegistrationStepsFlow.SELECT_SUB_SUPPORT)
        }
      />
    </Row>
  );
};

export default SelectSupport;
