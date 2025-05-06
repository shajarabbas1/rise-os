'use client';
import Row from '@/components/shared/row';
import {
  CardDescription,
  CardHeading,
  SectionHeading,
} from '@/components/shared/typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authBGImage, dummyEmail } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import RoundedInput from '@/components/shared/form/Rounded.input';

interface IFormData {
  digitOne: string;
  digitTwo: string;
  digitThree: string;
  digitFour: string;
  digitFive: string;
  digitSix: string;
}

const Page = () => {
  const [resendTimer, setResendTimer] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleResend = () => {
    // Logic to resend OTP goes here (API call etc.)
    console.log('Resending OTP...');
    setResendTimer(10); // Restart timer
  };

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      digitOne: '',
      digitTwo: '',
      digitThree: '',
      digitFour: '',
      digitFive: '',
      digitSix: '',
    },
  });

  type FieldName = keyof IFormData;

  const formFields = [
    {
      name: 'digitOne' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: 'digitTwo' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: 'digitThree' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: 'digitFour' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: 'digitFive' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
    {
      name: 'digitSix' as FieldName,
      type: 'text',
      rules: { maxLength: 1, pattern: /^[0-9]$/ },
    },
  ];

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);
  const ref6 = useRef<HTMLInputElement>(null);

  const inputRefs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const fieldName = formFields[index].name;
    if (e.key === 'Backspace' && !watch(fieldName) && index > 0) {
      e.preventDefault();
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleInput = (index: number) => {
    const fieldName = formFields[index].name;
    const value = watch(fieldName);
    if (index < 5 && value) {
      inputRefs[index + 1].current?.focus();
    }
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
        <SectionHeading title="Verify your email" className="" />

        <CardDescription
          title="To complete your account setup, enter the code we've sent. to :"
          className=""
        />

        <CardHeading title={dummyEmail} className="my-4" />

        <Row className="gap-2 items-center">
          {formFields?.map((field, index) => (
            <RoundedInput
              key={index}
              name={field.name}
              control={control}
              errors={errors}
              rules={field.rules}
              type={field.type}
              className="text-black"
              inputRef={inputRefs[index]}
              onKeyDown={e => handleKeyDown(index, e)}
              onChange={() => handleInput(index)}
            />
          ))}
        </Row>

        {resendTimer > 0 ? (
          <CardDescription
            title={`Resend in ${resendTimer}s`}
            className="my-4"
          />
        ) : (
          <button
            onClick={handleResend}
            className="text-indigo-600 cursor-pointer text-sm font-[500] my-4"
          >
            Resend OTP
          </button>
        )}
      </Row>
    </Row>
  );
};

export default Page;
