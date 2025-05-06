import { ITypoGraphyProps } from './types';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['vietnamese'] });

const CardHeading: React.FC<ITypoGraphyProps> = ({
  title,
  className,
  onClick,
}) => {
  return (
    <h3
      className={`text-[16px] font-semibold ${montserrat.className} ${className}`}
      onClick={onClick}
    >
      {title}
    </h3>
  );
};

export default CardHeading;
