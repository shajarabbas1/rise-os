/* eslint-disable @typescript-eslint/no-explicit-any */
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

const ReviewSelectedSupport: React.FC<{ handleNextStep: any }> = ({
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

  const stepHeading = 'Review your selected supports';

  return (
    <Row className="w-full bg-white p-4 rounded-2xl gap-4 flex-col items-end">
      <Row className="w-full justify-between items-center">
        <Row className="w-[28%] items-center justify-between">
          <ProgressBar />
          <ProgressBar colorClassName="!bg-indigo-400" />
          <CircleCard count={3} className="size-[40px] z-40" />
        </Row>

        <WatchVideo
          title="Watch Video"
          className="justify-end"
          imgURL="https://images.unsplash.com/photo-1726179612723-124312ff97a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          handleOnClick={toggleVideoModal}
        />
      </Row>

      <CardHeading title={stepHeading} className="w-full" />

      <Row className="w-full justify-between">
        <Row className="w-[25%] gap-4 items-start">
          <CircleCard count={1} className="size-[40px]" />

          <Row className="w-full flex-col gap-6">
            <CardHeading title="Main Support Category" />

            <Row className="w-full flex-wrap gap-3">
              {[
                {
                  title: 'Assistive Tech & Access',
                  description:
                    'Equipment and modifications to improve mobility, and home accessibility for greater independence.',
                },
              ].map((item, index) => (
                <CategoryCard
                  key={index}
                  title={item.title}
                  containerClassName="w-full"
                  description={item.description}
                />
              ))}
            </Row>
          </Row>
        </Row>

        <Row className="w-[60%] gap-4 items-start">
          <CircleCard count={2} className="size-[40px]" />

          <Row className="w-full flex-col gap-6">
            <CardHeading title="Main Support Category" />

            <Row className="w-full flex-wrap gap-3">
              {[
                {
                  title: 'Personal mobility equipment',
                  description:
                    'Device that assist individuals in moving independently, such as wheelchairs, scooters, and walking aids.',
                },
                {
                  title: 'Hearing equipment',
                  description:
                    'Technology specifically designed to support hearing needs, including hearing aids and assistive listening devices.',
                },
                {
                  title: 'Specialized driver training',
                  description:
                    'Tailored driving lessons specifically for individuals with disabilities to help them safely operate a personal vehicle.',
                },
              ].map((item, index) => (
                <CategoryCard
                  key={index}
                  title={item.title}
                  containerClassName="w-[32%]"
                  description={item.description}
                />
              ))}
            </Row>
          </Row>
        </Row>
      </Row>

      <Row className="gap-2">
        <IconButton
          title="Back"
          className="border-2 border-orange-300"
          handleOnClick={() =>
            handleNextStep(RegistrationStepsFlow.SELECT_SUB_SUPPORT)
          }
        />
        <IconButton
          title="Confirm"
          className="bg-orange-300"
          handleOnClick={() => handleNextStep(RegistrationStepsFlow.SUMMARY)}
        />
      </Row>

      {showVideoModal && (
        <VideoTutorialModal
          heading={stepHeading}
          onCancel={toggleVideoModal}
          stepNumber={3}
        />
      )}
    </Row>
  );
};

export default ReviewSelectedSupport;
