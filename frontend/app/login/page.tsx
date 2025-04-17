'use client';
import IconButton from '@/components/shared/button';
import LabeledInput from '@/components/shared/form/Labeled.input';
import LabeledCheckbox from '@/components/shared/form/LabeledCheckBox.input';
import Row from '@/components/shared/row';
import {
  CardDescription,
  SectionHeading,
} from '@/components/shared/typography';
import { emailField, passwordField } from '@/constants/form-fields.constants';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { authBGImage } from '@/constants';

const Page = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    reset();
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

      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '123'}
      >
        <Row className="w-[55%] flex-col items-start">
          <SectionHeading title="Login" className="" />
          <CardDescription
            title="Your portal to person centred care."
            className="mb-6"
          />

          {[emailField, passwordField].map((item, index) => (
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
              className="text-indigo-600 cursor-pointer underline text-sm font-[500]"
            />
          </Row>

          <IconButton
            title="Login"
            className="bg-orange-400 py-2 w-full mt-4"
            btnClassName="text-center w-full"
            handleOnClick={handleSubmit(onSubmit)}
          />

          <div className="w-full mt-4">
            <GoogleLogin
              onSuccess={() => console.log('success case')}
              onError={() => console.log('error case')}
              useOneTap
            />
          </div>

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
      </GoogleOAuthProvider>
    </Row>
  );
};

export default Page;
