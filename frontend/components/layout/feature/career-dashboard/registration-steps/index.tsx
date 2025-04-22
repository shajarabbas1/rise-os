import { useState, useMemo } from 'react';
import SelectSupport from './SelectSupport';
import SelectSubSupport from './SelectSubSupport';
import ReviewSelectedSupport from './ReviewSelectedSupport';
import SupportSummary from './SupportSummary';

export const RegistrationStepsFlow = {
  SELECT_SUPPORT: 'support',
  SELECT_SUB_SUPPORT: 'sub_support',
  REVIEW: 'review',
  SUMMARY: 'summary',
};

const RegistrationSteps = () => {
  const [selectedStep, setSelectedStep] = useState<string>(
    RegistrationStepsFlow.SELECT_SUPPORT,
  );

  const content = useMemo(() => {
    switch (selectedStep) {
      case RegistrationStepsFlow.SELECT_SUPPORT:
        return <SelectSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlow.SELECT_SUB_SUPPORT:
        return <SelectSubSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlow.REVIEW:
        return <ReviewSelectedSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlow.SUMMARY:
        return <SupportSummary />;

      default:
        return null;
    }
  }, [selectedStep]);

  return <>{content}</>;
};

export default RegistrationSteps;
