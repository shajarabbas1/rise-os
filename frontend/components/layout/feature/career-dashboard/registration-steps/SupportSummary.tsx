import CircleCard from '@/components/shared/cards/CircleCount.card';
import VideoTutorialModal from '@/components/shared/modals/VideoTutorial.modal';
import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';
import { useCallback, useState } from 'react';
import WatchVideo from '../WatchVideo';
import IconButton from '@/components/shared/button';
import { FaCheckCircle } from 'react-icons/fa';
import ProgressBar from '@/components/layout/progress-bar';
import CategoryCard from '@/components/shared/cards/Category.card';

const SupportSummary = () => {
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

  return (
    <Row className="w-full bg-white p-4 rounded-2xl gap-4 flex-col items-end ">
      <Row className="w-full  justify-between items-center">
        <Row className="w-[16%] items-center justify-between">
          <ProgressBar />
          <ProgressBar colorClassName="!bg-indigo-400" />
          <ProgressBar colorClassName="!bg-green-400" />

          <CircleCard count={4} className="size-[40px] z-40" />
        </Row>

        <WatchVideo
          title="Watch Video"
          className="justify-end"
          imgURL="https://images.unsplash.com/photo-1726179612723-124312ff97a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          handleOnClick={toggleVideoModal}
        />
      </Row>

      <Row className="w-full items-center justify-between">
        <Row className="w-[60%] flex-col">
          <CardHeading
            title={'Class of Support Summary'}
            className="w-full mb-4"
          />
          {[
            { title: 'Support Category', description: 'Personal Care' },
            {
              title: 'Services',
              description:
                'Assistance with daily living, medication management, etc.',
            },
          ].map((item, index) => (
            <Row className="items-center justify-start" key={index}>
              <CardHeading title={item.title} className="!text-[12px]" />
              <CardDescription title={`: ${item.description}`} className="" />
            </Row>
          ))}
        </Row>

        <CategoryCard
          title={'AI Suggestions'}
          containerClassName=""
          description={
            'The Service Agreement needs an updated signature section to be valid.'
          }
        />
      </Row>

      <Row className="w-full items-center justify-between mt-4">
        <Row className="w-[60%] flex-col">
          <CardHeading
            title={'Upload Documentation Review'}
            className="w-full mb-4"
          />

          <Row className="flex-col gap-1">
            {[
              {
                title: 'Worker Screening Clearance',
                status: 'APPROVED',
                message: '',
              },
              {
                title: 'Consent for Information Sharing',
                status: 'WARNING',
                message: 'Review and approve',
              },
              {
                title: 'Service Agreement',
                status: 'ERROR',
                message: 'Upload required',
              },

              {
                title: 'Participant Risk Management',
                status: 'APPROVED',
                message: '',
              },
              {
                title: 'Policies and Procedures',
                status: 'APPROVED',
                message: '',
              },
            ].map((item, index) => (
              <Row className="w-full items-center" key={index}>
                <CardHeading
                  title={item.title}
                  className="w-[40%] !text-[12px]"
                />

                <Row className="gap-2 items-center w-[40%]">
                  <FaCheckCircle
                    className={`size-[15px] ${item.status === 'APPROVED' ? 'text-green-600' : item.status === 'ERROR' ? 'text-red-500' : 'text-yellow-500'}`}
                  />
                  <CardDescription title={`${item.message}`} className="" />
                </Row>
              </Row>
            ))}
          </Row>
        </Row>

        <CategoryCard
          title={'Next Steps'}
          containerClassName=""
          description={
            'The Service Agreement needs an updated signature section to be valid.'
          }
        />
      </Row>

      <IconButton title="Confirm" className="bg-orange-300" />
      {showVideoModal && (
        <VideoTutorialModal
          heading={'Step 4 video modal'}
          onCancel={toggleVideoModal}
          stepNumber={4}
        />
      )}
    </Row>
  );
};

export default SupportSummary;
