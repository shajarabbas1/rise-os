'use client';

import { FaCheck, FaRegCircle } from 'react-icons/fa6';
import zxcvbn from 'zxcvbn';
import IconButton from '@/components/shared/button';
import LabeledInput from '@/components/shared/form/Labeled.input';
import Row from '@/components/shared/row';
import {
  CardDescription,
  CardHeading,
  SectionHeading,
} from '@/components/shared/typography';
import {
  fullNameField,
  passwordField,
} from '@/constants/form-fields.constants';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { authBGImage, dummyEmail } from '@/constants';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import { getFirstLetter } from '@/utils/helper';

const Page = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<{ fullName: string; password: string }>({
    defaultValues: {
      fullName: '',
      password: '',
    },
    mode: 'onChange', // enables real-time validation state
  });

  const passwordValue = watch('password');
  const passwordStrength = passwordValue ? zxcvbn(passwordValue).score : 0;

  const rulesChecklist = [
    {
      label: '8 characters minimum',
      passed: passwordValue.length >= 8,
    },
    {
      label: 'Uppercase and lowercase letters',
      passed: /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue),
    },
    {
      label: 'One symbol',
      passed: /[^A-Za-z0-9]/.test(passwordValue),
    },
  ];

  const allRulesPassed =
    rulesChecklist.every(rule => rule.passed) && passwordStrength >= 3;

  const onSubmit = async (data: any) => {
    console.log(data);
    reset();
  };

  const getStrengthText = (score: number) => {
    return ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
  };

  return (
    <Row className="px-4 py-6 justify-between items-center overflow-hidden">
      <Image
        alt="Video Guide"
        height={20}
        width={60}
        loading="eager"
        src={authBGImage}
        className="w-[42%] object-cover rounded-4xl"
      />

      <Row className="w-[55%] flex-col items-start">
        <SectionHeading title="Create your password" />

        <Row className="items-center gap-2">
          <CircleCard
            count={getFirstLetter(dummyEmail)}
            className="size-[34px]"
          />
          <CardHeading title={dummyEmail} className="my-4" />
        </Row>

        <Row className="flex-col gap-4 w-full">
          <LabeledInput
            name={fullNameField.name}
            label={fullNameField.label}
            control={control}
            placeHolder={fullNameField.placeHolder}
            type={fullNameField.type}
            rules={fullNameField.rules}
            errors={errors}
          />

          <LabeledInput
            name={passwordField.name}
            label={passwordField.label}
            control={control}
            placeHolder={passwordField.placeHolder}
            type={passwordField.type}
            showErrors={false}
            rules={{
              required: 'Password is required',
              validate: {
                minLength: v =>
                  v.length >= 8 || 'Password must be at least 8 characters',
                upperLower: v =>
                  (/[a-z]/.test(v) && /[A-Z]/.test(v)) ||
                  'Use upper and lower case letters',
                symbol: v =>
                  /[^A-Za-z0-9]/.test(v) || 'Use at least one symbol',
                strength: () => passwordStrength >= 3 || 'Password is too weak',
              },
            }}
            errors={errors}
          />

          {passwordValue && (
            <div className="w-full mt-[-12px] mb-3">
              {/* Strength bar */}
              <div
                className={`w-full border-4 border-dashed rounded-full transition-all ${
                  [
                    'border-red-400',
                    'border-orange-400',
                    'border-yellow-400',
                    'border-green-400',
                    'border-green-600',
                  ][passwordStrength]
                }`}
                style={{ width: `${(passwordStrength + 1) * 20}%` }}
              />

              <CardDescription
                title={`Strength: ${getStrengthText(passwordStrength)}`}
                className='mt-2'
              />

              {/* Checklist */}
              <CardHeading title="Must contain at least:" className="mt-3" />
              <ul className="text-sm space-y-1 text-gray-600">
                {rulesChecklist.map(rule => (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-1 ${
                      rule.passed ? 'text-green-500' : ''
                    }`}
                  >
                    <span>{rule.passed ? <FaCheck /> : <FaRegCircle />}</span>
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Row>

        <IconButton
          title="Create Password"
          className="bg-orange-400 py-2 w-full mt-4"
          btnClassName="text-center w-full"
          handleOnClick={handleSubmit(onSubmit)}
          disabled={!isValid || !allRulesPassed}
        />
      </Row>
    </Row>
  );
};

export default Page;
