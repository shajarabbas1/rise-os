'use client';
import IconButton from '@/components/shared/button';
import LabeledInput from '@/components/shared/form/Labeled.input';
import LabeledCheckbox from '@/components/shared/form/LabeledCheckBox.input';
import Row from '@/components/shared/row';
import {
  CardDescription,
  SectionHeading,
} from '@/components/shared/typography';
import { emailField } from '@/constants/form-fields.constants';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authBGImage } from '@/constants';
import { useEffect, useState } from 'react';
import { userActions } from '@/redux/actions/user.action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

interface IFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const activeUser = useSelector((state: any) => state.user.user);

  // Redirect safely after render - if the user has not check/validate the email
  useEffect(() => {
    if (activeUser) {
      router.push(PAGES_ROUTES.careerDashboard);
    }
  }, [activeUser, router]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  
  const onSubmit = (data: IFormData) => {
    setIsProcessing(true);

    dispatch(
      userActions.login.request({
        email: data.email,
        password: data.password,

        onSuccess: () => {
          toast.success('Login successful!', { toastId: 'login-success' });
          setIsProcessing(false);
          reset();
          router.push(PAGES_ROUTES.careerDashboard);
        },

        onError: (errorMessage: string) => {
          toast.error(errorMessage || 'Login failed. Please try again.', {
            toastId: 'login-error',
          });
          setIsProcessing(false);
        },
      }),
    );
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
        <SectionHeading title="Login" className="" />
        <CardDescription
          title="Your portal to person centred care."
          className="mb-6"
        />

        {[
          emailField,
          {
            name: 'password',
            label: 'Enter your password',
            placeHolder: 'Enter your password',
            type: 'password',
            rules: {
              required: 'Password is required',
            },
          },
        ].map((item, index) => (
          <LabeledInput
            key={index}
            name={item.name}
            label={item.label}
            control={control}
            placeHolder={item?.placeHolder}
            type={item.type}
            rules={item.rules}
            errors={errors}
          />
        ))}

        <Row className="w-full justify-between items-center mb-6">
          <LabeledCheckbox
            className="font-[700]"
            name="rememberMe"
            label="Remember Me"
            control={control}
            errors={errors}
          />

          <CardDescription
            title="Forgot Password?"
            onClick={() => router.push(PAGES_ROUTES.forgotPassword)}
            className="text-indigo-600 cursor-pointer underline text-sm font-[500]"
          />
        </Row>

        <IconButton
          title={`${isProcessing ? 'Processing...' : 'Login'}`}
          className={`bg-orange-400 py-2 w-full mt-4 `}
          btnClassName="text-center w-full"
          handleOnClick={handleSubmit(onSubmit)}
        />

        <div className="w-full h-1 mt-6 bg-slate-200" />

        <Row className="mt-[30px] justify-center items-center">
          <span className="text-sm font-[500] text-[#808080]">
            Need an account?
          </span>
          &nbsp;
          <CardDescription
            title="Sign up"
            onClick={() => router.push(PAGES_ROUTES.signup)}
            className="text-indigo-600 cursor-pointer underline text-sm font-[500]"
          />
        </Row>
      </Row>
    </Row>
  );
};

export default Page;
