import CategoryCard from '@/components/shared/cards/Category.card';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import VideoTutorialModal from '@/components/shared/modals/VideoTutorial.modal';
import Row from '@/components/shared/row';
import { CardHeading } from '@/components/shared/typography';
import { useCallback, useState } from 'react';
import WatchVideo from '../WatchVideo';
import IconButton from '@/components/shared/button';
import ProgressBar from '@/components/layout/progress-bar';
import { RegistrationStepsFlow } from '.';

const SelectSubSupport: React.FC<{ handleNextStep: any }> = ({
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

  const stepHeading = 'Select the specific services you will provide';
  return (
    <Row className="w-full bg-white p-4 rounded-2xl gap-4 flex-col items-end">
      <Row className="w-full justify-between items-center">
        <Row className="w-[16%] items-center justify-between">
          <ProgressBar />
          <CircleCard count={2} className="size-[40px] z-40" />
        </Row>

        <WatchVideo
          title="Watch Video"
          className="justify-end"
          imgURL="https://images.unsplash.com/photo-1726179612723-124312ff97a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          handleOnClick={toggleVideoModal}
        />
      </Row>

      <CardHeading title={stepHeading} className="w-full" />

      <Row className="w-full flex-wrap gap-3">
        {[
          {
            title: 'Assistive products for personal care and safety',
          },
          {
            title: 'Personal mobility equipment',
          },
          {
            title: 'Assistance with travel/transport arrangements',
          },

          {
            title: 'Assistance equipment for recreation',
          },
          {
            title: 'Vision equipment',
          },
          {
            title: 'Hearing equipment',
          },
          {
            title: 'Communication and information equipment',
          },
          { title: 'Specialized driver training' },
          { title: 'Customized prosthetics' },
        ].map((item, index) => (
          <CategoryCard
            key={index}
            title={item.title}
            containerClassName="w-[19%]"
            handleDetailClick={() => alert('Detail page is pending...')}
          />
        ))}
      </Row>

      <Row className="gap-2">
        <IconButton
          title="Back"
          className="border-2 border-orange-300"
          handleOnClick={() =>
            handleNextStep(RegistrationStepsFlow.SELECT_SUPPORT)
          }
        />
        <IconButton
          title="Next"
          className="bg-orange-300"
          handleOnClick={() => handleNextStep(RegistrationStepsFlow.REVIEW)}
        />
      </Row>

      {showVideoModal && (
        <VideoTutorialModal
          heading={stepHeading}
          onCancel={toggleVideoModal}
          stepNumber={2}
        />
      )}
    </Row>
  );
};

export default SelectSubSupport;
