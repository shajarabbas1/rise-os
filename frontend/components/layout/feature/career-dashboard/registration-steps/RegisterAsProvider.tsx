import IconButton from '@/components/shared/button';
import RegistrationStepCard from '@/components/shared/cards/RegistrationStep.card';
import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';
import ProfileStatItem from '../ProfileStatItem';
import { GrDocumentText } from 'react-icons/gr';
import RegistrationNavigation from '@/components/layout/navigation/registration.navigation';
import { useState } from 'react';
import FormListing from '../form-and-modules-steps';
import Feed from '../Feed';
import File from '../File';
import { GoChecklist } from 'react-icons/go';
import RegistrationSteps from '.';
import { TbTargetArrow } from 'react-icons/tb';
import { SlBookOpen } from 'react-icons/sl';

export enum RegistrationStepsEnum {
  REGISTRATION = 'REGISTRATION',
  FORM_AND_MODULES = 'FORM_AND_MODULES',
  COMPLIANCE = 'COMPLIANCE',
  FILES = 'FILES',
  FEED = 'FEED',
}

const RegisterAsProvider = () => {
  const [selectedStep, setSelectedStep] = useState<RegistrationStepsEnum>(
    RegistrationStepsEnum.REGISTRATION,
  );

  const renderContent = () => {
    switch (selectedStep) {
      case RegistrationStepsEnum.REGISTRATION:
        return <RegistrationSteps />;

      case RegistrationStepsEnum.FORM_AND_MODULES:
        return <FormListing />;

      case RegistrationStepsEnum.FEED:
        return <Feed />;

      case RegistrationStepsEnum.FILES:
        return <File />;

      default:
        return <CardDescription title={'In Progress...'} />;
    }
  };

  return (
    <Row className="w-full bg-[#f8f0e2] gap-4 flex-col ">
      <Row className="w-full p-6 flex-col bg-white rounded-2xl">
        <CardHeading title="Policy & Compliance Auditor" />
        <CardDescription title="Review policies and monitor compliance requirements" />

        <Row className="flex-wrap items-center justify-between gap-4 mt-4">
          {[
            {
              title: 'Overall Compliance',
              percentage: '92',
              Icon: TbTargetArrow,
              containerClassName: 'bg-green-200',
            },
            {
              title: 'Documentation Quality',
              percentage: '88',
              Icon: GrDocumentText,
              containerClassName: 'bg-orange-200',
            },
            {
              title: 'Policy Adherence',
              percentage: '95',
              Icon: SlBookOpen,
              containerClassName: 'bg-green-200',
            },
            {
              title: 'Risk Management',
              percentage: '60',
              Icon: GoChecklist,
              containerClassName: 'bg-red-200',
            },
          ].map((item, index) => (
            <ProfileStatItem
              key={index}
              Icon={item.Icon}
              percentage={item.percentage}
              title={item.title}
              containerClassName={`${item.containerClassName} w-[24%]`}
            />
          ))}
        </Row>

        <Row className="w-full bg-[#fda10c4a] mt-4 gap-4 p-2 rounded-lg">
          {[
            {
              title: 'Registration',
              state: RegistrationStepsEnum.REGISTRATION,
            },
            {
              title: 'Forms & Modules',
              state: RegistrationStepsEnum.FORM_AND_MODULES,
            },
            { title: 'Compliance', state: RegistrationStepsEnum.COMPLIANCE },
            { title: 'Files', state: RegistrationStepsEnum.FILES },
            { title: 'Feed', state: RegistrationStepsEnum.FEED },
          ].map((item, index) => (
            <RegistrationNavigation
              key={index}
              isSelected={selectedStep === item.state}
              onClick={() => setSelectedStep(item.state)}
              title={item.title}
            />
          ))}
        </Row>
      </Row>

      <Row className="hidden w-full p-6 flex-col bg-white rounded-2xl">
        <CardHeading title="Register as a provider" />
        <CardDescription
          className="text-justify"
          title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        />

        <IconButton
          title="Get Started"
          btnClassName="bg-green-300"
          className="mt-2 justify-end"
        />

        <Row className="justify-between items-center mt-4">
          {[
            {
              title: 'Select a Support Category',
              subContainerClass: 'bg-yellow-300',
              imageUrl:
                'https://plus.unsplash.com/premium_photo-1676977395455-e083eed4bbff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              title: 'Choose Support Classes',
              subContainerClass: 'bg-green-300',
              imageUrl:
                'https://plus.unsplash.com/premium_photo-1668708034541-4ba9a33fae3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              title: 'Review and Confirm Selction',
              subContainerClass: 'bg-indigo-400',
              imageUrl:
                'https://images.unsplash.com/photo-1742205309355-70e063aa1865?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              title: 'Submission & Next Steps',
              subContainerClass: 'bg-yellow-200',
              imageUrl:
                'https://plus.unsplash.com/premium_photo-1743096946788-b8d8304542d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D',
            },
          ].map((item, index) => (
            <RegistrationStepCard
              key={index}
              title={item.title}
              containerClassName="w-[24%]"
              imageUrl={item.imageUrl}
              stepNumber={index + 1}
              subContainerClass={item.subContainerClass}
            />
          ))}
        </Row>
      </Row>

      {renderContent()}
    </Row>
  );
};

export default RegisterAsProvider;
