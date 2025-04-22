'use client';
import IconButton from '@/components/shared/button';
import LabeledInput from '@/components/shared/form/Labeled.input';
import Row from '@/components/shared/row';
import {
  CardDescription,
  SectionHeading,
} from '@/components/shared/typography';
import { emailField } from '@/constants/form-fields.constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authBGImage } from '@/constants';
import { PAGES_ROUTES } from '@/constants/routes.constants';

interface IFormData {
  email: string;
}

const Page = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IFormData) => {
    console.log(data);
    router.push(PAGES_ROUTES.createPassword);
    reset();
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
        <SectionHeading title="Password Recovery" className="" />

        <CardDescription title="Recover your password" className="mb-6" />

        {[emailField].map((item, index) => (
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

        <IconButton
          title="Forgot Password"
          className="bg-orange-400 py-2 w-full"
          btnClassName="text-center w-full"
          handleOnClick={handleSubmit(onSubmit)}
        />
      </Row>
    </Row>
  );
};

export default Page;
