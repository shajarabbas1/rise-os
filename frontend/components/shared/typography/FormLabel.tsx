import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface IFormLabelProps {
  htmlFor: string;
  label: string;
  className?: string;
}

const FormLabel: React.FC<IFormLabelProps> = ({
  htmlFor,
  label,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={` text-sm text-gray-700 font-[500] mb-2 block ${inter.className} ${className}`}
    >
      {label}
    </label>
  );
};

export default FormLabel;
