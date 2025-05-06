import CategoryCard from '@/components/shared/cards/Category.card';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import VideoTutorialModal from '@/components/shared/modals/VideoTutorial.modal';
import Row from '@/components/shared/row';
import { CardHeading } from '@/components/shared/typography';
import { useCallback, useState } from 'react';
import WatchVideo from '../WatchVideo';
import IconButton from '@/components/shared/button';
import ProgressBar from '@/components/layout/progress-bar';
import { RegistrationStepsFlowEnum } from '.';

interface ISelectSubSupportProps {
  handleNextStep: (step: RegistrationStepsFlowEnum) => void;
}

interface ISubSupport {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

const SelectSubSupport: React.FC<ISelectSubSupportProps> = ({
  handleNextStep,
}) => {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedSubSupports, setSelectedSubSupports] = useState<ISubSupport[]>(
    [],
  );

  const toggleSubSupport = useCallback((item: ISubSupport) => {
    setSelectedSubSupports(prev => {
      const exists = prev.some(support => support.id === item.id);

      if (exists) {
        return prev.filter(support => support.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

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
            id: '01',
            description: '',
            categoryId: '',
            name: 'Assistive products for personal care and safety',
          },
          {
            id: '02',
            description: '',
            categoryId: '',
            name: 'Personal mobility equipment',
          },
          {
            id: '03',
            description: '',
            categoryId: '',
            name: 'Assistance with travel/transport arrangements',
          },
          {
            id: '04',
            description: '',
            categoryId: '',
            name: 'Assistance equipment for recreation',
          },
          {
            id: '05',
            description: '',
            categoryId: '',
            name: 'Vision equipment',
          },
          {
            id: '06',
            description: '',
            categoryId: '',
            name: 'Hearing equipment',
          },
          {
            id: '07',
            description: '',
            categoryId: '',
            name: 'Communication and information equipment',
          },
          {
            id: '08',
            description: '',
            categoryId: '',
            name: 'Specialized driver training',
          },
          {
            id: '09',
            description: '',
            categoryId: '',
            name: 'Customized prosthetics',
          },
        ].map(item => {
          const isSelected = selectedSubSupports.some(s => s.id === item.id);
          return (
            <CategoryCard
              key={item.id}
              title={item.name}
              containerClassName={`w-[19%] cursor-pointer ${isSelected ? 'border-2' : ''}`}
              handleDetailClick={() => alert('Detail page is pending...')}
              onClick={() => toggleSubSupport(item)}
            />
          );
        })}
      </Row>

      <Row className="gap-2">
        <IconButton
          title="Back"
          className="border-2 border-orange-300"
          handleOnClick={() =>
            handleNextStep(RegistrationStepsFlowEnum.SELECT_SUPPORT)
          }
        />

        <IconButton
          title="Next"
          className="bg-orange-300"
          handleOnClick={() => handleNextStep(RegistrationStepsFlowEnum.REVIEW)}
          disabled={!selectedSubSupports.length}
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
