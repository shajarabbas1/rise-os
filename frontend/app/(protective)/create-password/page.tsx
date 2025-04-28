/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { authBGImage } from '@/constants';
import CircleCard from '@/components/shared/cards/CircleCount.card';
import { getFirstLetter } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@/redux/slices/user.slice';
interface IFormData {
  fullName: string;
  password: string;
  email: string;
}

const Page = () => {
  const router = useRouter();

  const email = useSelector((state: any) => state.user.validatedEmail);
  const dispatch = useDispatch();
  // Redirect safely after render - if the user has not check/validate the email
  useEffect(() => {
    if (!email) {
      router.push(PAGES_ROUTES.signup);
    }
  }, [email, router]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormData>({
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

  const onSubmit = async (data: IFormData) => {
    console.log({ ...data, email });
    dispatch(
      userActions.setUserNameAndPaswordRequest({
        email,
        fullName: data.fullName,
        password: data.password,
      }),
    );
    router.push(PAGES_ROUTES.careerDashboard);
    // reset();
  };

  const getStrengthText = (score: number) => {
    return ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
  };

  return (
    <Row className="px-4 py-6 justify-between items-center overflow-hidden">
      <Image
        alt="Video Guide"
        height={90}
        width={570}
        loading="eager"
        src={authBGImage}
        className="object-cover rounded-4xl"
      />

      <Row className="w-[55%] flex-col items-start">
        <SectionHeading title="Create your password" />

        <Row className="items-center gap-2">
          <CircleCard count={getFirstLetter(email)} className="size-[34px]" />
          <CardHeading title={email} className="my-4" />
        </Row>

        <Row className="flex-col gap-4 w-full">
          {[fullNameField, passwordField].map(item => (
            <LabeledInput
              key={item.name}
              name={item.name}
              label={item.label}
              register={register}
              placeHolder={item.placeHolder}
              type={item.type}
              validationRules={item.rules}
              errors={errors}
            />
          ))}

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
                className="mt-2"
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
