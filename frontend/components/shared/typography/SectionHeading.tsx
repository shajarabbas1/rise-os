import { ITypoGraphyProps } from './types';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['vietnamese'] });

const SectionHeading: React.FC<ITypoGraphyProps> = ({ title, className }) => {
  return (
    <h2
      className={`capitalize text-[28px] font-black ${montserrat.className} ${className}`}
    >
      {title}
    </h2>
  );
};

export default SectionHeading;
