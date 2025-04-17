import { ITypoGraphyProps } from './types';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const CardDescription: React.FC<ITypoGraphyProps> = ({
  title,
  className,
  onClick,
}) => {
  return (
    <p onClick={onClick} className={`text-[12px] ${className} ${inter.className}`}>
      {title}
    </p>
  );
};

export default CardDescription;
