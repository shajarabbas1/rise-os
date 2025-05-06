import { useState, useMemo } from 'react';
import SelectSupport from './SelectSupport';
import SelectSubSupport from './SelectSubSupport';
import ReviewSelectedSupport from './ReviewSelectedSupport';
import SupportSummary from './SupportSummary';

export enum RegistrationStepsFlowEnum {
  SELECT_SUPPORT = 'SELECT_SUPPORT',
  SELECT_SUB_SUPPORT = 'SELECT_SUB_SUPPORT',
  REVIEW = 'REVIEW',
  FILES = 'FILES',
  SUMMARY = 'SUMMARY',
}

const RegistrationSteps = () => {
  const [selectedStep, setSelectedStep] = useState<RegistrationStepsFlowEnum>(
    RegistrationStepsFlowEnum.SELECT_SUPPORT,
  );

  const content = useMemo(() => {
    switch (selectedStep) {
      case RegistrationStepsFlowEnum.SELECT_SUPPORT:
        return <SelectSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlowEnum.SELECT_SUB_SUPPORT:
        return <SelectSubSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlowEnum.REVIEW:
        return <ReviewSelectedSupport handleNextStep={setSelectedStep} />;

      case RegistrationStepsFlowEnum.SUMMARY:
        return <SupportSummary />;

      default:
        return null;
    }
  }, [selectedStep]);

  return <>{content}</>;
};

export default RegistrationSteps;
